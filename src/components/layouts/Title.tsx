interface TitleProps {
    testName: string;
}

const Title = ({ testName }: TitleProps): JSX.Element => {
    return <title>{`LabGraph - ${testName}`}</title>;
};

export default Title;
