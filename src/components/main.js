import ContentBox from './content-box';

const Main = props => {
    const Items = props.loc.location.map((location, i) => {
        return <ContentBox location={location} key={i}/>
    });
    
    return (
        <div className="MainWrapper">
            { Items }
        </div>
    );
}

export default Main;