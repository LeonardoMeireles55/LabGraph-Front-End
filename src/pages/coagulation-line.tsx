import DualLineLabGraph from "@/components/chart/DualLineLabGraph";

const list = ['TAP-20', 'TTPA'];

export default function Coagulation() {
    return <DualLineLabGraph testList={list} analyticsType="coagulation-analytics" />;
}
