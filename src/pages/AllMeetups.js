import { useState, useEffect } from "react";
import MeetupList from "../components/meetups/MeetupList";

function AllMeetupsPage(){
  const [ isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);
  
  useEffect(()=> {
    setIsLoading(true);
    fetch('https://meetup-a51d2-default-rtdb.firebaseio.com/meetups.json',
    ).then(response => {
      return response.json();
    }).then(data => {
      const meetups = [];
      for (const key in data) {
        const meetup = {
          id: key,
          ...data[key]
        };
        meetups.push(meetup);
      }
      setIsLoading(false);
      setLoadedMeetups(meetups);
    });

  }, []);


  if (isLoading){
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

    return <section>
        <h1>All Meetups Page</h1>
        {/* <ul>
        {DUMMY_DATA.map((meetup)=> {
            return <li key={meetup.id}>{meetup.title}</li>;
        })}
        </ul> */}
        <MeetupList meetups={loadedMeetups}/>
        </section>
}

export default AllMeetupsPage;