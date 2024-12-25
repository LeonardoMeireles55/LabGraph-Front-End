import GraphWrapper from "@/components/chart/GraphWrapper";

const list = ['TAP-20', 'TTPA'];

export default function Coagulation() {
    return <GraphWrapper testList={list} analyticsType="coagulation-analytics" />;
}
