import React, { useState, useEffect } from 'react';

export const ProductSearch = props => {
    const [ name, setName ] = useState("");

    return <div className="row">
        <div className="col-10">
            <div className="form-group">
                <label htmlFor="search_name">Product Search</label>
                <input type="text"
                    id="search_name"
                    name="search_name"
                    value={ name }
                    className="form-control"
                    onChange={ event => setName(event.target.value) } />
            </div>
        </div>

        <div className="col-6">
            <button className="btn btn-primary btn-success float-right mt-3" onClick={ () => props.onSearch({ name }) } >Search</button>
        </div>
    </div>
};