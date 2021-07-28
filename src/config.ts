import { MetaDataItemsObject, MetaDataObject } from './common/types';

export const CURIE = {
  ALWAYS_PREFIXED: ['RHEA', 'GO', 'CHEBI', 'HP', 'MONDO', 'DOID', 'EFO', 'UBERON', 'MP', 'CL', 'MGI'],
};

export const TIMEOUT = 30000;

export const MAX_BIOTHINGS_INPUT_SIZE = 1000;

export const MAX_CONCURRENT_QUERIES = 3;

export const APIMETA: MetaDataItemsObject = {
  Gene: {
    id_ranks: ['NCBIGene', 'ENSEMBL', 'HGNC', 'SYMBOL', 'OMIM', 'UniProtKB', 'UMLS', 'MGI', 'name'],
    semantic: 'Gene',
    api_name: 'mygene.info',
    url: 'https://mygene.info/v3/query',
    mapping: {
      NCBIGene: ['entrezgene'],
      name: ['name'],
      SYMBOL: ['symbol'],
      UMLS: ['umls.cui', 'umls.protein_cui'],
      HGNC: ['HGNC'],
      UniProtKB: ['uniprot.Swiss-Prot'],
      ENSEMBL: ['ensembl.gene'],
      OMIM: ['MIM'],
      MGI: ['MGI'],
    },
    additional_attributes_mapping: {
      interpro: ['interpro.desc'],
      type_of_gene: ['type_of_gene'],
    },
  },
  Protein: {
    id_ranks: ['UniProtKB', 'ENSEMBL', 'SYMBOL', 'UMLS', 'name'],
    semantic: 'Protein',
    api_name: 'mygene.info',
    url: 'https://mygene.info/v3/query',
    mapping: {
      name: ['name'],
      SYMBOL: ['symbol'],
      UMLS: ['umls.cui', 'umls.protein_cui'],
      UniProtKB: ['uniprot.Swiss-Prot'],
      ENSEMBL: ['ensembl.protein'],
    },
    additional_attributes_mapping: {
      interpro: ['interpro.desc'],
    },
  },
  SequenceVariant: {
    id_ranks: ['HGVS', 'DBSNP', 'MYVARIANT_HG19', 'CLINVAR'],
    api_name: 'myvariant.info',
    semantic: 'SequenceVariant',
    url: 'https://myvariant.info/v1/query',
    mapping: {
      MYVARIANT_HG19: ['_id'],
      DBSNP: ['dbsnp.rsid', 'clinvar.rsid', 'dbnsfp.rsid'],
      HGVS: ['clinvar.hgvs.genomic', 'clinvar.hgvs.protein', 'clinvar.hgvs.coding'],
      ClINVAR: ['clinvar.rcv.accession'],
    },
    additional_attributes_mapping: {
      cadd_consequence: ['cadd.consequence'],
      cadd_variant_type: ['cadd.type'],
      dbsnp_variant_type: ['dbsnp.vartype'],
      clinvar_clinical_significance: ['clinvar.rcv.clinical_significance'],
      sift_category: ['cadd.sift.cat'],
    },
  },
  ChemicalSubstance: {
    id_ranks: [
      'CHEBI',
      'CHEMBL.COMPOUND',
      'DRUGBANK',
      'PUBCHEM.COMPOUND',
      'MESH',
      'INCHI',
      'INCHIKEY',
      'UNII',
      'KEGG',
      'UMLS',
      'name',
    ],
    semantic: 'ChemicalSubstance',
    api_name: 'mychem.info',
    url: 'https://mychem.info/v1/query',
    mapping: {
      'CHEMBL.COMPOUND': ['chembl.molecule_chembl_id', 'drugbank.xrefs.chembl', 'drugcentral.xrefs.chembl_id'],
      DRUGBANK: ['drugcentral.xrefs.drugbank_id', 'pharmgkb.xrefs.drugbank', 'chebi.xrefs.drugbank', 'drugbank.id'],
      'PUBCHEM.COMPOUND': [
        'pubchem.cid',
        'drugbank.xrefs.pubchem.cid',
        'drugcentral.xrefs.pubchem_cid',
        'pharmgkb.xrefs.pubchem.cid',
      ],
      CHEBI: ['chebi.id', 'chembl.chebi_par_id', 'drugbank.xrefs.chebi', 'drugcentral.xrefs.chebi'],
      UMLS: ['drugcentral.xrefs.umlscui', 'pharmgkb.xrefs.umls', 'umls.cui'],
      MESH: ['umls.mesh', 'drugcentral.xrefs.mesh_descriptor_ui', 'ginas.xrefs.MESH', 'pharmgkb.xrefs.mesh'],
      UNII: ['drugcentral.xrefs.unii', 'unii.unii', 'aeolus.unii', 'ginas.unii'],
      INCHIKEY: ['drugbank.inchi_key', 'ginas.inchikey', 'unii.inchikey', 'chebi.inchikey'],
      INCHI: ['drugbank.inchi', 'chebi.inchi', 'chembl.inchi'],
      KEGG: ['drugbank.xrefs.kegg.cid'],
      LINCS: ['unichem.lincs'],
      name: ['chembl.pref_name', 'drugbank.name', 'umls.name', 'ginas.preferred_name', 'pharmgkb.name', 'chebi.name'],
    },
    additional_attributes_mapping: {
      chembl_max_phase: ['chembl.max_phase'],
      chembl_molecule_type: ['chembl.molecule_type'],
      drugbank_drug_category: ['drugbank.categories.category'],
      drugbank_taxonomy_class: ['drugbank.taxonomy.class'],
      drugbank_groups: ['drugbank.groups'],
      drugbank_kingdom: ['drugbank.taxonomy.kingdom'],
      drugbank_superclass: ['drugbank.taxonomy.superclass'],
      contraindications: ['drugcentral.drug_use.contraindication.concept_name'],
      indications: ['drugcentral.drug_use.indication.concept_name'],
      mesh_pharmacology_class: ['drugcentral.pharmacology_class.mesh_pa.description'],
      fda_epc_pharmacology_class: ['drugcentral.pharmacology_class.fda_epc.description'],
    },
  },
  Drug: {
    id_ranks: [
      'CHEBI',
      'CHEMBL.COMPOUND',
      'DRUGBANK',
      'PUBCHEM.COMPOUND',
      'MESH',
      'INCHI',
      'INCHIKEY',
      'UNII',
      'KEGG',
      'UMLS',
      'LINCS',
      'name',
    ],
    semantic: 'ChemicalSubstance',
    api_name: 'mychem.info',
    url: 'https://mychem.info/v1/query',
    mapping: {
      'CHEMBL.COMPOUND': ['chembl.molecule_chembl_id', 'drugbank.xrefs.chembl', 'drugcentral.xrefs.chembl_id'],
      DRUGBANK: ['drugcentral.xrefs.drugbank_id', 'pharmgkb.xrefs.drugbank', 'chebi.xrefs.drugbank', 'drugbank.id'],
      'PUBCHEM.COMPOUND': [
        'pubchem.cid',
        'drugbank.xrefs.pubchem.cid',
        'drugcentral.xrefs.pubchem_cid',
        'pharmgkb.xrefs.pubchem.cid',
      ],
      CHEBI: ['chebi.id', 'chembl.chebi_par_id', 'drugbank.xrefs.chebi', 'drugcentral.xrefs.chebi'],
      UMLS: ['drugcentral.xrefs.umlscui', 'pharmgkb.xrefs.umls', 'umls.cui'],
      MESH: ['umls.mesh', 'drugcentral.xrefs.mesh_descriptor_ui', 'ginas.xrefs.MESH', 'pharmgkb.xrefs.mesh'],
      UNII: ['drugcentral.xrefs.unii', 'unii.unii', 'aeolus.unii', 'ginas.unii'],
      INCHIKEY: ['drugbank.inchi_key', 'ginas.inchikey', 'unii.inchikey', 'chebi.inchikey'],
      INCHI: ['drugbank.inchi', 'chebi.inchi', 'chembl.inchi'],
      KEGG: ['drugbank.xrefs.kegg.cid'],
      name: ['chembl.pref_name', 'drugbank.name', 'umls.name', 'ginas.preferred_name', 'pharmgkb.name', 'chebi.name'],
    },
    additional_attributes_mapping: {
      chembl_max_phase: ['chembl.max_phase'],
      chembl_molecule_type: ['chembl.molecule_type'],
      drugbank_drug_category: ['drugbank.categories.category'],
      drugbank_taxonomy_class: ['drugbank.taxonomy.class'],
      drugbank_groups: ['drugbank.groups'],
      drugbank_kingdom: ['drugbank.taxonomy.kingdom'],
      drugbank_superclass: ['drugbank.taxonomy.superclass'],
      contraindications: ['drugcentral.drug_use.contraindication.concept_name'],
      indications: ['drugcentral.drug_use.indication.concept_name'],
      mesh_pharmacology_class: ['drugcentral.pharmacology_class.mesh_pa.description'],
      fda_epc_pharmacology_class: ['drugcentral.pharmacology_class.fda_epc.description'],
    },
  },
  PhenotypicFeature: {
    id_ranks: ['UMLS', 'SNOMEDCT', 'HP', 'MEDDRA', 'EFO', 'NCIT', 'MESH', 'MP', 'name'],
    semantic: 'PhenotypicFeature',
    api_name: 'HPO API',
    url: 'https://biothings.ncats.io/hpo/query',
    mapping: {
      UMLS: ['xrefs.umls'],
      SNOMEDCT: ['xrefs.snomed_ct'],
      HP: ['_id'],
      MEDDRA: ['xrefs.meddra'],
      EFO: ['xrefs.efo'],
      NCIT: ['xrefs.ncit'],
      MESH: ['xrefs.mesh'],
      MP: ['xrefs.mp'],
      name: ['name'],
    },
  },
  Disease: {
    id_ranks: ['MONDO', 'DOID', 'OMIM', 'ORPHANET', 'SNOMEDCT', 'NCIT', 'EFO', 'UMLS', 'MESH', 'HP', 'GARD', 'name'],
    semantic: 'Disease',
    api_name: 'mydisease.info',
    url: 'https://mydisease.info/v1/query',
    mapping: {
      MONDO: ['mondo.mondo'],
      DOID: ['mondo.xrefs.doid'],
      UMLS: [
        'mondo.xrefs.umls',
        'mondo.xrefs.umls_cui',
        'disgenet.xrefs.umls',
        'umls.umls',
        'disease_ontology.xrefs.umls_cui',
      ],
      name: ['mondo.label', 'disgenet.xrefs.disease_name'],
      MESH: ['mondo.xrefs.mesh', 'disease_ontology.xrefs.mesh', 'ctd.mesh'],
      OMIM: ['mondo.xrefs.omim', 'hpo.omim', 'disgenet.xrefs.omim'],
      EFO: ['mondo.xrefs.efo'],
      ORPHANET: ['hpo.orphanet', 'mondo.xrefs.orphanet'],
      GARD: ['mondo.xrefs.gard', 'disease_ontology.xrefs.gard'],
      HP: ['mondo.xrefs.hp'],
      SNOMEDCT: ['mondo.xrefs.sctid', 'umls.snomed.preferred', 'umls.snomed.non-preferred'],
      NCIT: ['mondo.xrefs.ncit', 'disease_ontology.xrefs.ncit']
    },
  },
  ClinicalFinding: {
    id_ranks: ['LOINC', 'NCIT', 'EFO', 'name'],
    semantic: 'Disease',
    api_name: 'mydisease.info',
    url: 'https://mydisease.info/v1/query',
    mapping: {
      LOINC: ['mondo.xrefs.loinc'],
      NCIT: ['mondo.xrefs.ncit', 'disease_ontology.xrefs.ncit'],
      EFO: ['mondo.xrefs.efo', 'disgenet.xrefs.efo', 'disease_ontology.xrefs.efo'],
      name: ['mondo.label', 'disgenet.xrefs.disease_name', 'disease_ontology.name'],
    },
  },
  MolecularActivity: {
    id_ranks: ['GO', 'MetaCyc', 'RHEA', 'KEGG', 'REACT', 'name'],
    semantic: 'MolecularActivity',
    api_name: 'Gene Ontology Molecular Function API',
    url: 'https://biothings.ncats.io/go_mf/query',
    mapping: {
      GO: ['_id'],
      MetaCyc: ['xrefs.metacyc'],
      RHEA: ['xrefs.rhea'],
      KEGG: ['xrefs.kegg_reaction'],
      REACT: ['xrefs.reactome'],
      name: ['name'],
    },
  },
  BiologicalProcess: {
    id_ranks: ['GO', 'MetaCyc', 'REACT', 'KEGG', 'name'],
    semantic: 'BiologicalProcess',
    api_name: 'Gene Ontology Biological Process API',
    url: 'https://biothings.ncats.io/go_bp/query',
    mapping: {
      GO: ['_id'],
      MetaCyc: ['xrefs.metacyc'],
      KEGG: ['xrefs.kegg_pathway'],
      REACT: ['xrefs.reactome'],
      name: ['name'],
    },
  },
  CellularComponent: {
    id_ranks: ['GO', 'MetaCyc', 'name'],
    semantic: 'CellularComponent',
    api_name: 'Gene Ontology Cellular Component API',
    url: 'https://biothings.ncats.io/go_cc/query',
    mapping: {
      GO: ['_id'],
      MetaCyc: ['xrefs.metacyc'],
      name: ['name'],
    },
  },
  Pathway: {
    id_ranks: ['REACT', 'KEGG', 'PHARMGKB.PATHWAYS', 'WIKIPATHWAYS', 'BIOCARTA', 'GO', 'SMPDB', 'name'],
    semantic: 'Pathway',
    api_name: 'Geneset API',
    url: 'https://biothings.ncats.io/geneset/query',
    mapping: {
      REACT: ['reactome'],
      WIKIPATHWAYS: ['wikipathways'],
      KEGG: ['kegg'],
      BIOCARTA: ['biocarta'],
      'PHARMGKB.PATHWAYS': ['pharmgkb'],
      GO: ['go'],
      SMPDB: ['smpdb'],
      name: ['name'],
    },
    additional_attributes_mapping: {
      num_of_participants: ['num_of_participants'],
    },
  },
  AnatomicalEntity: {
    id_ranks: ['UBERON', 'UMLS', 'MESH', 'NCIT', 'name'],
    semantic: 'AnatomicalEntity',
    api_name: 'UBERON API',
    url: 'https://biothings.ncats.io/uberon/query',
    mapping: {
      UBERON: ['_id'],
      UMLS: ['xrefs.umls'],
      MESH: ['xrefs.mesh'],
      NCIT: ['xrefs.ncit'],
      name: ['name'],
    },
  },
  Cell: {
    id_ranks: ['CL', 'NCIT', 'MESH', 'EFO', 'name'],
    semantic: 'Cell',
    api_name: 'Cell Onotlogy API',
    url: 'https://biothings.ncats.io/cell_ontology/query',
    mapping: {
      CL: ['_id'],
      NCIT: ['xrefs.ncit'],
      MESH: ['xrefs.mesh'],
      EFO: ['xrefs.efo'],
      name: ['name'],
    },
  },
};
