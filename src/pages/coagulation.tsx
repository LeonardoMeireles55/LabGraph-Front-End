import LabGraph from '@/components/main/LabGraph';

const list = ["TAP-20", "TTPA"];

export default function Coagulation() {
    return (
        <LabGraph
            testList={list}
            analyticsType="coagulation-analytics"
        />
    );
}
