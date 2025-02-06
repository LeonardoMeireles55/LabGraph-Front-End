const list = [
  'ALB2',
  'ALP2S',
  'ALTL',
  'AMYL2',
  'ASTL',
  'BILD2',
  'BILT3',
  'CA2',
  'CHOL2',
  'CK2',
  'CKMB2',
  'CL-I',
  'CREJ2',
  'CRP4',
  'GGTI2',
  'GLUC3',
  'HDLC4',
  'K-I',
  'LDHI2',
  'LIP',
  'MG-2',
  'NA-I',
  'PHOS2',
  'TRIGL',
  'UA2',
  'UREL',
  'TAP-20',
  'TTPA',
  'WBC',
  'RBC',
  'HGB',
  'HCT',
  'MCV',
  'MCH',
  'MCHC',
  'RDW-CV',
  'PLT',
  'NEU#',
  'LYM#',
  'MON#',
  'EOS#',
  'BAS#',
  'NRBC%',
  'NRBC#',
  'NEU%',
  'LYM%',
  'MON%',
  'EOS%',
  'BAS%',
];

const returnFullNameByTest = (test: string) => {
  switch (test) {
    case 'ALB2':
      return 'Albumin';
    case 'ALP2S':
      return 'Alkaline Phosphatase';
    case 'ALTL':
      return 'Alanine Aminotransferase';
    case 'AMYL2':
      return 'Amylase';
    case 'ASTL':
      return 'Aspartate Aminotransferase';
    case 'BILD2':
      return 'Direct Bilirubin';
    case 'BILT3':
      return 'Total Bilirubin';
    case 'CA2':
      return 'Calcium';
    case 'CHOL2':
      return 'Total Cholesterol';
    case 'CK2':
      return 'Creatine Kinase';
    case 'CKMB2':
      return 'Creatine Kinase-MB';
    case 'CL-I':
      return 'Chloride';
    case 'CREJ2':
      return 'Creatinine';
    case 'CRP4':
      return 'C-Reactive Protein';
    case 'GGTI2':
      return 'Gamma-Glutamyl Transferase';
    case 'GLUC3':
      return 'Glucose';
    case 'HDLC4':
      return 'HDL Cholesterol';
    case 'K-I':
      return 'Potassium';
    case 'LDHI2':
      return 'Lactate Dehydrogenase';
    case 'LIP':
      return 'Lipase';
    case 'MG-2':
      return 'Magnesium';
    case 'NA-I':
      return 'Sodium';
    case 'PHOS2':
      return 'Phosphorus';
    case 'TRIGL':
      return 'Triglycerides';
    case 'UA2':
      return 'Uric Acid';
    case 'UREL':
      return 'Urea';
    case 'TAP-20':
      return 'Activated Partial Thromboplastin Time';
    case 'TTPA':
      return 'Prothrombin Time';
    case 'WBC':
      return 'White Blood Cells';
    case 'RBC':
      return 'Red Blood Cells';
    case 'HGB':
      return 'Hemoglobin';
    case 'HCT':
      return 'Hematocrit';
    case 'MCV':
      return 'Mean Corpuscular Volume';
    case 'MCH':
      return 'Mean Corpuscular Hemoglobin';
    case 'MCHC':
      return 'Mean Corpuscular Hemoglobin Concentration';
    case 'RDW-CV':
      return 'Red Cell Distribution Width';
    case 'PLT':
      return 'Platelets';
    case 'NEU#':
      return 'Absolute Neutrophils';
    case 'LYM#':
      return 'Absolute Lymphocytes';
    case 'MON#':
      return 'Absolute Monocytes';
    case 'EOS#':
      return 'Absolute Eosinophils';
    case 'BAS#':
      return 'Absolute Basophils';
    case 'NRBC%':
      return 'Nucleated Red Blood Cells Percentage';
    case 'NRBC#':
      return 'Absolute Nucleated Red Blood Cells';
    case 'NEU%':
      return 'Neutrophils Percentage';
    case 'LYM%':
      return 'Lymphocytes Percentage';
    case 'MON%':
      return 'Monocytes Percentage';
    case 'EOS%':
      return 'Eosinophils Percentage';
    case 'BAS%':
      return 'Basophils Percentage';
    default:
      return test;
  }
};

export default returnFullNameByTest;
