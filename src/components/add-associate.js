import React, {useEffect, useRef, useState} from 'react';
import _ from "lodash";
import './styles.scss'
import data from './sample-data.json'
import {useHistory} from 'react-router-dom'
import {HTTP} from "../service/core/http.service";
import {urls} from "../config/urlConfig";

const associateModel = {
    id: '',
    name: '',
    phone: '',
    address: '',
};

export function AddAssociate(props) {
    const [associate, setAssociate] = useState(associateModel);
    const [errors, setErrors] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault()
        const errors = validateAssociate(associate);
        setErrors(errors)

        if (!_.isEmpty(errors)) {
            return;
        }

        if (isUpdating) {
            updateAssociate(associate);
        } else {
            addAssociate(associate);
        }
    }

    const addAssociate = async (associate) => {
        try {
            await HTTP.post(urls.add, associate)
        } catch (e) {
            alert('Unable to add new associate');
        }
    }

    const updateAssociate = async (associate) => {
        try {
            await HTTP.put(urls.update, associate)
        } catch (e) {
            alert('Unable to update associate');
        }
    }

    const getAssociate = async (id) => {
        try {
            const result = await HTTP.get(urls.details + id)
            const details = result.data.details;
            setAssociate(details);
        } catch (e) {
            alert('Unable to get associate details');
        }
    }

    const validateAssociate = (associate) => {
        const errors = [];
        if (_.isEmpty(associate.name)) {
            errors.push({field: 'name', msg: 'Name is required'})
        }
        if (_.isEmpty(associate.phone)) {
            errors.push({field: 'phone', msg: 'Phone is required'})
        }
        if (_.isEmpty(associate.address)) {
            errors.push({field: 'address', msg: 'Address is required'})
        }
        return errors
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setAssociate({
            ...associate,
            [name]: value
        })
    }

    const handleBack = () => {
        history.push('/list-associate')
    }

    useEffect(() => {
        const userId = props.match.params.id;
        if (userId > 0) {
            const user = data.associateList.find(u => +u.id === +userId);
            // TODO: Uncomment below
            // getAssociate(userId)
            setAssociate(user);
            setIsUpdating(true);
        }
    }, [])

    return (
        <div className={'container add-associate-main'}>
            <div className="row">
                <button className={'btn btn-secondary'} onClick={() => handleBack()}>back</button>
            </div>
            <form className={'row mt-3'} onSubmit={handleSubmit}>
                <div className="col-12 px-0">
                    <input autoFocus={true}
                           autoComplete={'off'}
                           placeholder={'Name'}
                           type="text"
                           name={'name'}
                           value={associate.name}
                           className={'mr-2 form-control'}
                           onChange={handleChange}/>

                    <input placeholder={'Phone'}
                           type="number"
                           name={'phone'}
                           value={associate.phone}
                           className={'mr-2 form-control'}
                           onChange={handleChange}/>

                    <textarea name="address" id="address" cols="14" rows="10"
                              className={'mr-2 form-control'}
                              value={associate.address}
                              onChange={handleChange} />

                    <div>
                        {errors.length > 0 && <ul className={'mt-3'}>
                            {errors.map(({msg}, index) => {
                                return <li className={'text-danger'} key={'error-' + index}>{msg}</li>
                            })}
                        </ul>}
                    </div>

                    <input className={'btn btn-success mt-3'} type="submit" value={isUpdating ? 'Update' : 'Add'}/>
                </div>


            </form>
        </div>
    );
}
