import React, { useState, useEffect } from 'react';
import { } from '@material-ui/core';

export const ProductSearch = props => {
    const [ name, setName ] = useState("");
    const [ isFilter, setFilter ] = useState(false);

    let filter = (!isFilter) ? 
        <div>
            <a className="d-flex justify-content-center" onClick={ () => setFilter(!isFilter) }>Filter Options</a>
        </div>
        : 
        <div className="row">
            <div className="col-4"></div>
            <div className="col-2">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="sort" id="default" value="default" defaultChecked/>
                    <label class="form-check-label" for="flexRadioDefault1">
                        Default
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="sort" id="asc" value="asc" />
                    <label class="form-check-label" for="flexRadioDefault2">
                        Ascending
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="sort" id="desc" value="desc" />
                    <label class="form-check-label" for="flexRadioDefault2">
                        Descending
                    </label>
                </div>
            </div>
            <div className="col-2">
            <div class="form-check">
                <input class="form-check-input" type="radio" name="filter" id="flexRadioDefault1" defaultChecked/>
                <label class="form-check-label" for="flexRadioDefault1">
                    All
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="filter" id="flexRadioDefault2"/>
                <label class="form-check-label" for="flexRadioDefault2">
                    In Stock
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="filter" id="flexRadioDefault3"/>
                <label class="form-check-label" for="flexRadioDefault2">
                    Low Stock
                </label>
            </div>
        </div>
    </div>
        

    

    return <div className="row">
        <div className="col-1"></div>
        <div className="col-8">
            <div className="form-group">
                <label htmlFor="search_name">Search Product</label>
                <input type="text"
                    id="search_name"
                    name="search_name"
                    value={ name }
                    className="form-control"
                    onChange={ event => setName(event.target.value) } />
            </div>
        </div>

        <div className="col-2">
            <button type="button" className="btn btn-primary btn-success float-right mt-4" onClick={ () => props.onSearch({ name }) } >Search</button>
        </div>
        
        <div><br/></div> 
        
        {filter}

    </div>
};