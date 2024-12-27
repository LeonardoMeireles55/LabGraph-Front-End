import GraphWrapper from "@/components/charts";

const list = ['TAP-20', 'TTPA'];

export default function Coagulation() {
    return <GraphWrapper testList={list} analyticsType="coagulation-analytics" levelListSize={2} />;
}
