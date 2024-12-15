import LabGraph from '@/components/chart/LabGraph';

const list = ['TAP-20', 'TTPA'];

export default function Coagulation() {
    return <LabGraph testList={list} analyticsType="coagulation-analytics" />;
}
