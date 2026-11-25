import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { GeneTable } from "./GeneTable";
import { HiglassBrowser } from "./HiglassBrowser";
import { Facets } from "./Facets";
import { RELEASE, PUBLICATIONS } from "./release";
import udnLogo from "./assets/udn_logo_header.png";

const n = (x) => x.toLocaleString("en-US");

function ReleaseBanner() {
  return (
    <div className="alert alert-info release-banner mb-0" role="status">
      <span className="badge badge-primary mr-2">New release · {RELEASE.name}</span>
      <strong>{n(RELEASE.participants)}</strong> sequenced participants from{" "}
      <strong>{n(RELEASE.families)}</strong> families ({n(RELEASE.affected)} affected,{" "}
      {n(RELEASE.unaffected)} unaffected, {n(RELEASE.unknownStatus)} unknown status). SNVs and
      indels called with {RELEASE.caller}.{" "}
      <a href="#about" className="alert-link">
        What's included
      </a>
    </div>
  );
}

function Publication({ p }) {
  return (
    <li className="mb-3">
      {p.authors} <strong>{p.title}</strong>. <em>{p.journal}</em> {p.details}.
      {p.doi && (
        <>
          {" "}
          <a href={p.url} target="_blank" rel="noopener noreferrer">
            doi:{p.doi}
          </a>
        </>
      )}
      {p.note && <div className="text-muted small">{p.note}</div>}
    </li>
  );
}

function App() {
  return (
    <React.Fragment>
      <header className="container pt-4">
        <div className="d-flex flex-wrap align-items-center justify-content-between">
          <a href="https://undiagnosed.hms.harvard.edu/" target="_blank" rel="noopener noreferrer">
            <img src={udnLogo} alt="Undiagnosed Diseases Network" className="udn-logo" />
          </a>
          <nav className="nav small">
            <a className="nav-link" href="#variant-view">Variants</a>
            <a className="nav-link" href="#gene-view">Genes</a>
            <a className="nav-link" href="#about">About this release</a>
            <a className="nav-link" href="#publications">Publications</a>
            <a className="nav-link" href="#contact">Contact</a>
          </nav>
        </div>

        <h1 className="pt-4 pb-2 text-center">UDN Cohort Browser</h1>
        <div className="row justify-content-md-center">
          <div className="col col-lg-9">
            <p className="text-center lead">
              Look up rare, likely damaging SNVs and indels in your gene or region of interest
              across sequenced{" "}
              <a href="https://undiagnosed.hms.harvard.edu/">Undiagnosed Diseases Network</a>{" "}
              participants and their family members. Each variant shows de-identified carriers with
              their phenotypes (HPO terms), affected status and any diagnosis.
            </p>
            <p className="text-center">
              Found a participant who may match your patient or model? <a href="#contact">Contact
              us</a> to start a collaboration.
            </p>
          </div>
        </div>

        <ReleaseBanner />

        <div className="row justify-content-lg-center mt-4">
          <div className="col-6 col-lg-2">
            <a className="btn btn-primary d-inline-block btn-block" href="#variant-view">
              Variant View
            </a>
          </div>
          <div className="col-6 col-lg-2">
            <a className="btn btn-outline-primary d-inline-block btn-block" href="#gene-view">
              Gene View
            </a>
          </div>
        </div>
      </header>

      <section className="container mt-5">
        <h2 id="variant-view" className="pt-3">Variant-level browser</h2>
        <p className="text-muted small mb-0">
          Click a variant for its annotations, cohort counts and the de-identified participants who
          carry it.
        </p>
        <div className="row mt-3">
          <div className="col-md-3 ">
            <div className="border p-2 mt-3">
              <Facets />
            </div>
          </div>
          <div className="col-md-9">
            <div className="fixedHeight">
              <HiglassBrowser />
            </div>
          </div>
        </div>
      </section>

      <section className="container mt-5">
        <h2 id="gene-view" className="pt-3">Gene-level statistical analysis</h2>
        <p className="small">
          <i>
            Gene-level statistics are from{" "}
            <a href={PUBLICATIONS[0].url} target="_blank" rel="noopener noreferrer">
              Kobren, Moldovan et al., <em>Nature Communications</em> 2025
            </a>{" "}
            and were computed on the cohort analyzed in that study; they have not been recomputed
            for this release. P-values are not corrected for multiple testing and are
            therefore not necessarily significant; see the paper for the significant findings.
          </i>
        </p>
        <GeneTable />
      </section>

      <section className="container mt-5">
        <h2 id="about" className="pt-3">About this release</h2>
        <div className="row">
          <div className="col-lg-6">
            <h5 className="mt-3">Participants and sequencing</h5>
            <ul>
              <li>
                {n(RELEASE.participants)} participants from {n(RELEASE.families)} UDN families:{" "}
                {n(RELEASE.affected)} affected, {n(RELEASE.unaffected)} unaffected and{" "}
                {n(RELEASE.unknownStatus)} with unknown affected status. One sample per
                participant.
              </li>
              <li>
                Genome ({n(RELEASE.genomeParticipants)} participants) or exome (
                {n(RELEASE.exomeParticipants)}) sequencing, aligned to GRCh38.
              </li>
              <li>
                SNVs and indels called per family with {RELEASE.caller} (no cohort-wide joint
                calling).
              </li>
              <li>Previous release: {RELEASE.previous}.</li>
            </ul>

            <h5 className="mt-3">Annotations</h5>
            <ul>
              {RELEASE.annotations.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>

          <div className="col-lg-6">
            <h5 className="mt-3">Which variants are included</h5>
            <ul>
              <li>
                <strong>Rare:</strong> highest gnomAD allele frequency (genomes, exomes or any
                genetic-ancestry group) below 10%, or absent from gnomAD.
              </li>
              <li>
                <strong>In a gene</strong> (Ensembl 107 transcript), on chromosomes 1–22, X, Y or
                the mitochondrial genome.
              </li>
              <li>
                <strong>Likely functional:</strong> a coding or splice consequence of at least low
                impact with CADD raw score above 1 (or unscored), <em>or</em> any predicted
                SpliceAI effect, <em>or</em> listed in ClinVar.
              </li>
              <li>
                <strong>Good-quality carrier:</strong> at least one participant carries the variant
                with a DRAGEN genotype that passes filters or has genotype quality ≥ 20.
              </li>
            </ul>

            <h5 className="mt-3">How to read the cohort counts</h5>
            <ul>
              <li>
                <strong>Cases</strong> are affected participants; <strong>controls</strong> are
                unaffected participants (mostly relatives of probands).
              </li>
              <li>
                <strong>Allele number</strong> counts only participants with a confident genotype
                call at that position, so the allele frequency is the frequency among people
                actually genotyped there.
              </li>
              <li>
                Because calling was done per family, people in families without the variant may
                have no call at that position (for example, exome-sequenced participants outside
                the exome); they are not counted in the allele number.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="container mt-5">
        <h2 id="publications" className="pt-3">Publications</h2>
        <p>If you use this resource, please cite:</p>
        <ul className="list-unstyled">
          {PUBLICATIONS.map((p) => (
            <Publication key={p.title} p={p} />
          ))}
        </ul>
        <p className="small text-muted">* These authors contributed equally.</p>
      </section>

      <footer id="contact" className="container-fluid bg-light mt-5 py-4 text-center">
        <div className="mb-1">
          Questions, or interested in a collaboration involving a participant you found here?
          Contact us:
        </div>
        <div>
          <strong>Shilpa Kobren:</strong> shilpa_kobren at hms.harvard.edu
        </div>
      </footer>
    </React.Fragment>
  );
}

export default App;
