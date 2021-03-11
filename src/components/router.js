import React from 'react'
import {Route, Redirect} from 'react-router-dom';
export default function RouterCreator(props){
    const Routes = props.loc.location.map((location, i)=>{
        return (
            <Route path={"/"+location.country} key={location.city+" Route"}>
                <PageCreator location={location}/>
            </Route>
        )
    })
    return (
        <div className="MainWrapper">
            {Routes}
        </div>
        )
}

class PageCreator extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            country:this.props.location.country,
            city:this.props.location.city,
            redirect:false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    handleInputChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }
    handleSubmit(event){ 
        this.setState({redirect:true});
        event.preventDefault();
    }
    
    render(){
        if(this.state.redirect){
            return <Redirect to={{
                    pathname: "/buy",
                    state: this.state, 
                  }}/>
                
        }
        else{
            return(
                <div className="pageWrapperWrapper">
                    <div className="pageWrapper">
                        <div className="pageImgWrapper">
                            <img className="pageImg" src={this.props.location.img} alt=""/>
                        </div>
                        <div className="pageTitle">{this.props.location.country}</div>
                        <div className="pageSubtitle">{this.props.location.city}</div>
                        <div className="pageDetails">{this.props.location.details}</div>
                        <div className="pageDetailsMore">{this.props.location.moredetails}</div>
                        <div className="pageDetailsMore">{this.props.location.moredetails}</div>
                        <div className="pagePrice">Price: ${this.props.location.price}</div>
                        <form className="pageBuy">
                            <span>Room Type:</span>
                            <span><input type="radio" onChange={this.handleInputChange} id="single" name="room" value="Single Room" required/><label htmlFor="single"> Single Room</label></span>
                            <span><input type="radio" onChange={this.handleInputChange} id="double" name="room" value="Double Room" required/><label htmlFor="double"> Double Room</label></span>
                            <span><input type="radio" onChange={this.handleInputChange} id="triple" name="room" value="Triple Room" required/><label htmlFor="triple"> Triple Room</label></span>
                            <span><input type="radio" onChange={this.handleInputChange} id="apartment" name="room" value="Apartment" required/><label htmlFor="apartment"> Apartment</label></span>
                            <br />
                            <span>Additional Excursions:</span>
                            <span><input type="checkbox" onChange={this.handleInputChange} id={this.props.location.excursions[0]} name={this.props.location.excursions[0]} value={this.props.location.excursions[0]} /><label htmlFor={this.props.location.excursions[0]}> {this.props.location.excursions[0]}</label></span>
                            <span><input type="checkbox" onChange={this.handleInputChange} id={this.props.location.excursions[1]} name={this.props.location.excursions[1]} value={this.props.location.excursions[1]} /><label htmlFor={this.props.location.excursions[1]}> {this.props.location.excursions[1]}</label></span>
                            <span><input type="checkbox" onChange={this.handleInputChange} id={this.props.location.excursions[2]} name={this.props.location.excursions[2]} value={this.props.location.excursions[2]} /><label htmlFor={this.props.location.excursions[2]}> {this.props.location.excursions[2]}</label></span>
                            <span><input type="checkbox" onChange={this.handleInputChange} id={this.props.location.excursions[3]} name={this.props.location.excursions[3]} value={this.props.location.excursions[3]} /><label htmlFor={this.props.location.excursions[3]}> {this.props.location.excursions[3]}</label></span>
                            <br />
                            <span>Optional Offers:</span>
                            <span><input type="checkbox" onChange={this.handleInputChange} id="all-inclusive" name="allinclusive" value="All-Inclusive" /><label htmlFor="all-inclusive"> All-Inclusive</label></span>
                            <span><input type="checkbox" onChange={this.handleInputChange} id="beautiful-view" name="beautifulview" value="&quot;Beautiful View&quot; Offer" /><label htmlFor="beautiful-view"> "Beautiful View" Offer</label></span>
                            <br />
                            <input type="email" onChange={this.handleInputChange} id="email" name="email" placeholder="email@example.com" required />
                            <br />
                            <button className="pageBuyButton" onClick={this.handleSubmit}>Buy</button>
                        </form>
                    </div>
                </div>
                //todo Display details from db
            )
        }
    }
}
// this.location.excursions[0]