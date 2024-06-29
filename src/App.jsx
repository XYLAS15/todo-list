import { useEffect, useRef, useState } from 'react';
import './App.css';

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${date}/${month}/${year}`;
}

function App() {
  const [task, setTask] = useState('');
  const [mainTask, setMainTask] = useState([]);
  const [currentDate, setCurrentDate] = useState(getDate());
  const newDate = useRef(new Date());
  const [currentHours, setCurrentHours] = useState(newDate.current.getHours());
  const [currentMinutes, setCurrentMinutes] = useState(newDate.current.getMinutes());
  const [currentSeconds, setCurrentSeconds] = useState(newDate.current.getSeconds());

  const submitHandler = (e) => {
    e.preventDefault();
    if (task.trim() === '') {
      alert('Task cannot be empty');
      return;
    }
    setMainTask([...mainTask, { task }]);
    setTask('');
  };

  const deleteHandler = (i) => {
    let copyTask = [...mainTask];
    copyTask.splice(i, 1);
    setMainTask(copyTask);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      newDate.current = new Date();
      setCurrentHours(newDate.current.getHours());
      setCurrentMinutes(newDate.current.getMinutes());
      setCurrentSeconds(newDate.current.getSeconds());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const nowTime = `${currentHours} : ${currentMinutes} : ${currentSeconds}`;

  let renderTask = <h2>NO Task Available</h2>;

  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => {
      return (
        <div className='hi' key={i}>
          <li className='hello'>
            <h5>{t.task}</h5>
            <button
              className='btn'
              onClick={() => {
                deleteHandler(i);
              }}
            >
              DELETE
            </button>
          </li>
        </div>
      );
    });
  }

  return (
    <>
      <h1>JUST DO IT.</h1>
      <div className='main'>
        <form onSubmit={submitHandler}>
          <input
            type='text'
            id='task-id'
            name='id'
            className='input-task'
            placeholder='Enter Your Task'
            value={task}
            onChange={(e) => {
              setTask(e.target.value);
            }}
          />
          <button className='btn'>ADD!</button>
        </form>
      </div>

      <div className='date'>
        <h3>Today's Date: {currentDate}</h3>
        <p>||</p>
        <h3>Time Now: {nowTime}</h3>
      </div>
      <hr />
      <div className='render'>
        <ol>{renderTask}</ol>
      </div>
    </>
  );
}

export default App;
