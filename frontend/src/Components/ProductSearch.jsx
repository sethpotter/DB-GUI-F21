import React, { useState, useEffect } from 'react';
import { } from '@material-ui/core';

export const ProductSearch = props => {
    const [ name, setName ] = useState("");

    let filter =
        <div className="d-flex flex-row">
            <div className="px-3">
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
            <div className="px-3">
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
        

    

    return (
        <>
            <div className="d-flex flex-row justify-content-center">
                <div className="d-flex flex-row w-50 align-items-center panel p-3 me-3">
                    <div className="form-group flex-grow-1 mb-2">
                        <label className="pb-3" htmlFor="search_name">Search Product</label>
                        <div className="d-flex flex-row">
                            <input type="text"
                                   id="search_name"
                                   name="search_name"
                                   value={ name }
                                   className="form-control flex-grow-1 me-3"
                                   onChange={ event => setName(event.target.value) } />
                            <button type="button" className="btn app-btn float-right" onClick={ () => props.onSearch({ name }) } >Search</button>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="panel p-3">
                        <label className="ms-3 mb-2">Search Options</label>
                        {filter}
                    </div>
                </div>
            </div>
        </>
    );
};