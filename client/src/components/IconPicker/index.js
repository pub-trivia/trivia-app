import React from 'react';
import { SET_ICON } from '../../utils/actions';
import { useGameContext } from '../../utils/GlobalState';
import PlayerIcons from '../PlayerIcons';
import './iconpicker.css';

const IconPicker = () => {
    const [state, dispatch] = useGameContext();


    const iconOpts = [
        { name: "zach" },
        { name: "carl" },
        { name: "tim" },
        { name: "jon" },
        { name: "flipped" },
        { name: "afro" },
        { name: "ponytail" },
        { name: "shorthair" },
        { name: "cat" },
        { name: "puppy" },
        { name: "octopus" },
        { name: "squirell" }]

    const toggleIcon = event => {
        dispatch({
            type: SET_ICON,
            post: {
                icon: event.target.value
            }
        })
    }

    return (
        <div className="icon-picker">
            <h6>Icon:</h6>
            {iconOpts.map(icon => {
                return (
                    <div className="icon-choice" key={icon.name}>
                        <input type="radio" name="icon" id={icon.name} value={icon.name} onClick={event => toggleIcon(event)} />
                        <label>
                            <PlayerIcons icon={icon.name} color='#04D5FB' />
                        </label>
                    </div>
                )
            })
            }
        </div>
    )
}

export default IconPicker;