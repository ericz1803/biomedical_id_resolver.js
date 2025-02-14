import axios from 'axios';
import { CURIE } from './config';
import { SRIResolverOutput, ResolverInput } from './common/types';
import Debug from 'debug';
const debug = Debug('biomedical-id-resolver:QueryBuilder');

//input: array of curies
async function query(api_input: string[]) {
  let url: URL = new URL('https://nodenormalization-sri-dev.renci.org/1.1/get_normalized_nodes'); // TODO: change to non-dev version when ready
  //@ts-ignore
  url.search = new URLSearchParams(api_input.map(curie => ["curie", curie]));
  let res = await axios.get(url.toString());
  return res.data;
}

function transformResults(results, semanticType: string): SRIResolverOutput {
  Object.keys(results).forEach((key) => {
    let entry = results[key];
    let id_type = key.split(":")[0];
    if (entry === null) { //handle unresolvable entities
      entry = {
        id: {
          identifier: key,
          label: key
        },
        primaryID: key,
        label: key,
        curies: [key],
        attributes: {},
        semanticType: semanticType,
        _leafSemanticType: semanticType,
        semanticTypes: [semanticType],
        dbIDs: {
          [id_type]: CURIE.ALWAYS_PREFIXED.includes(id_type) ? key : key.split(":")[1],
          name: [key]
        },
        _dbIDs: {
          [id_type]: CURIE.ALWAYS_PREFIXED.includes(id_type) ? key : key.split(":")[1],
          name: [key]
        }
      };
    } else {
      //add fields included in biomedical-id-resolver
      entry.primaryID = entry.id.identifier;
      entry.label = entry.id.label || entry.id.identifier;
      entry.attributes = {};
      entry.semanticType = entry.type[0].split(":")[1]; // get first semantic type without biolink prefix
      if (semanticType !== entry.semanticType) {
        debug(`SRI resolved semantic type ${entry.semanticType} doesn't match input semantic type ${semanticType}`);
      }
      entry.semanticTypes = entry.type;

      let names = Array.from(new Set(entry.equivalent_identifiers.map(id_obj => id_obj.label))).filter((x) => (x != null));
      let curies = Array.from(new Set(entry.equivalent_identifiers.map(id_obj => id_obj.identifier))).filter((x) => (x != null));

      entry.curies = [...curies];

      //assemble dbIDs
      entry.dbIDs = {}
      entry.equivalent_identifiers.forEach((id_obj) => {
        let id_type = id_obj.identifier.split(":")[0];
        if (!Array.isArray(entry.dbIDs[id_type])) {
          entry.dbIDs[id_type] = [];
        }

        if (CURIE.ALWAYS_PREFIXED.includes(id_type)) {
          entry.dbIDs[id_type].push(id_obj.identifier);
        } else {
          let curie_without_prefix = id_obj.identifier.split(":")[1];
          entry.dbIDs[id_type].push(curie_without_prefix);
        }
      })
      entry.dbIDs.name = names;

      entry._leafSemanticType = entry.semanticType;
      entry._dbIDs = entry.dbIDs;
    }
    
    results[key] = [entry];
  });
  return results;
}

export async function _resolveSRI(userInput: ResolverInput): Promise<SRIResolverOutput> {
  let results = await Promise.all(Object.keys(userInput).map(async (semanticType) => {
    let query_results = await query(userInput[semanticType]);
    return transformResults(query_results, semanticType);
  }));

  return Object.assign({}, ...results); //convert array of objects into single object
}