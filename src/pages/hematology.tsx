import GraphWrapper from '@/components/chart/GraphWrapper';

const list = [
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

export default function Hematology() {
    return <GraphWrapper testList={list} analyticsType="hematology-analytics" levelListSize={3} />;
}
