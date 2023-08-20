import React, {useState} from 'react'

const About = () => {

    const [isToggleOn, setIsToggleOn] = useState(true);

    // const handleToggle = () => {
    //     setIsToggleOn(prevState => !prevState);
    // };

    return (
    <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <button >Toggle</button>
        {isToggleOn ? (

            <button >
                Sign In
            </button>
            ) : (
            <button>
                Sign Out
            </button>
            )}

        <br />
        <br />
        <br />
        <br />
        <br />

    </div>
    )
}

export default About
