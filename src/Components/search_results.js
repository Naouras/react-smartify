import React, { Component } from 'react';

class Result extends Component {
    render(){
        return (  
            <div>
            {
                 this.props.result ? <pre style={{textAlign: 'left'}}>{JSON.stringify(this.props.result, false, 3)}</pre>:
                  undefined
                  
                  }

            </div>            
          ) 
    }

}


export default Result;