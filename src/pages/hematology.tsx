import LabGraph from '@/components/chart/LabGraph';

const list = ['WBC', 'RBC', 'HGB', 'HCT', 'MCV', 'MCH', 'MCHC', 'RDW-CV', 'PLT',
    'NEU#', 'LYM#', 'MON#', 'EOS#', 'BAS#', 'IMG#', 'NRBC%', 'NRBC#',
    'NEU%', 'LYM%', 'MON%', 'EOS%', 'BAS%'];

export default function Coagulation() {
    return (
        <LabGraph
            testList={list}
            analyticsType="hematology-analytics"
        />
    );
}
