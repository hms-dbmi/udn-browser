// Facts about the current data release, shown on the landing page.
// Update this file (only) when the browser data are refreshed. Numbers come from the data build
// (udn_external_browser repo: WORK_DIR/samples.tsv and families.tsv).

export const RELEASE = {
  name: "November 2026",
  tag: "20261101",
  families: 2818,
  participants: 8204,
  affected: 3271,
  unaffected: 4495,
  unknownStatus: 438,
  genomeParticipants: 7150,
  exomeParticipants: 1054,
  caller: "Illumina DRAGEN v4.4",
  previous: "February 2024 (≈4,500 participants, cohort-wide joint calling)",
  annotations: [
    "Consequences: Ensembl VEP 107 (most severe consequence across transcripts)",
    "Population frequency: gnomAD v4.1 genomes and v4.0 exomes (including group-max)",
    "CADD v1.7 and SpliceAI scores",
    "ClinVar (15 November 2026 release)",
    "Phenotypes: HPO terms from the UDN Gateway, all named from HPO release 2026-09-01",
  ],
};

export const PUBLICATIONS = [
  {
    authors: "Kobren SN*, Moldovan MA*, et al.",
    title:
      "Joint, multifaceted genomic analysis enables diagnosis of diverse, ultra-rare monogenic presentations",
    journal: "Nature Communications",
    details: "16, 7267 (2025)",
    url: "https://www.nature.com/articles/s41467-025-61712-2",
    doi: "10.1038/s41467-025-61712-2",
    note: "The study this browser was first built for; gene-level statistics above are from this work.",
  },
  {
    authors: "Moldovan MA, et al.",
    title: "Trio meta-analysis finds disease genes and quantifies diagnostic evidence",
    journal: "Nature",
    details: "to appear",
    url: null,
    doi: null,
    note: "Follow-up study.",
  },
];
