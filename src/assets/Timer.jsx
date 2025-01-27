import { useEffect, useState } from "react"

export default function Timer() {
    const [workTime, setWorkTime] = useState({ min: 25, sec: 0 });
    const [input, setInput] = useState({ workTime: 0, restTime: 0 });
    const [isRunning, setIsRunning] = useState(false);
    const [isWork, setIsWork] = useState(true);

    useEffect(() => {
        if (!isRunning) return;

        const timer = setInterval(() => {
            setWorkTime((prev) => {
                if (prev.min === 0 && prev.sec === 0) {
                    if (isWork) {
                        setIsWork(false);
                        const secs = input.restTime * 60;
                        const min = Math.floor(secs / 60);
                        const sec = secs % 60;
                        clearInterval(timer);
                        setWorkTime({ min, sec });
                        return prev;
                    } else {
                        clearInterval(timer);
                        const secs = input.workTime * 60;
                        const min = Math.floor(secs / 60);
                        const sec = secs % 60;
                        setWorkTime({ min: min, sec: sec });
                        setIsRunning(false);
                        setIsWork(true);
                        return prev;
                    }
                } else if (prev.sec === 0) {
                    return { min: prev.min - 1, sec: 59 };
                } else {
                    return { ...prev, sec: prev.sec - 1 };
                }
            });
        }, 1000);

        function setTime(time) {
            const secs = input.restTime * 60;
            const min = Math.floor(secs / 60);
            const sec = secs % 60;
            setWorkTime({ min, sec });
        }

        return () => clearInterval(timer);
    }, [isRunning, isWork, input.restTime]);

    function handleSet(event) {
        event.preventDefault();
        setIsRunning(false)
        const secs = input.workTime * 60;
        const min = Math.floor(secs / 60);
        const sec = secs % 60;
        setWorkTime({ min: min, sec: sec })
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    return (
        <div className="main">
            <h1>Timer</h1>
            <h1>{workTime.min < 10 ? "0" + workTime.min : workTime.min}:{workTime.sec < 10 ? "0" + workTime.sec : workTime.sec}</h1>
            <h1>It's {isWork ? "Work" : "Rest"} Time</h1>
            <div>
                <button
                    onClick={() => setIsRunning(true)}
                    disabled={isRunning ? true : false}
                >
                    Start
                </button>
                <button
                    onClick={() => setIsRunning(false)}
                    disabled={isRunning ? false : true}
                >
                    Stop
                </button>
                <button
                    onClick={handleSet}
                >
                    Reset
                </button>
            </div>
            <form>
                <div className="input">
                    <input type="number" name="workTime" placeholder="Enter work time" onChange={handleChange} />
                    <input type="number" name="restTime" placeholder="Enter rest time" onChange={handleChange} />
                </div>
                <button type="submit" onClick={handleSet}>Set</button>
            </form>
        </div>
    )
}