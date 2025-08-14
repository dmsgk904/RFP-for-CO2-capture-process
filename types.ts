export interface Feedstock {
  id: string;
  description: string;
  unit: string;
  value: string;
  type: 'item' | 'header' | 'spacer';
  isSubItem?: boolean;
}

export interface Abbreviation {
  id: string;
  abbr: string;
  fullName: string;
}

export interface Utility {
  id: string;
  name: string;
  selected: boolean;
  condition: string;
}

export interface RfpData {
  companyName: string;
  projectName: string;
  introduction: string;
  abbreviations: Abbreviation[];
  scopeOfWork: string;
  blockFlowDiagram: string;
  feedstocks: Feedstock[];
  co2CaptureCapacity: string;
  utilities: Utility[];
  emissionRequirements: string;
  techReqs: {
    captureEfficiency: string;
    productPurity: string;
    lifetime: string;
    turndownRatio: string;
  };
  deliverables: Record<string, boolean>;
  submission: {
    submissionFormat: string;
    contactPerson: string;
    contactEmail: string;
    phone: string;
    deadline: string;
  };
  evaluationMetrics: {
    technicalFeasibility: string;
    references: string;
    cost: string;
    scheduleAdherence: string;
    esg: string;
  };
  timeline: {
    submissionDeadline: string;
    clarificationPeriod: string;
    evaluationPeriod: string;
    contractAward: string;
  };
  commercialTerms: Record<string, boolean>;
  annexes: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
  qa: string;
}