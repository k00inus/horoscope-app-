import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Horoscope.css";



function Horoscope() {
  const horoscope = {
    aries: {
      p: "There's a practical grounding today that may cramp your style, Aries. More than likely you'll be aware of the time restrictions that point up your own limits. Maybe you aren't being realistic about certain areas of your life. These things will become clear today as things progress. Push through this blockage. You'll be a much stronger person once you've moved past this point.",
      img: "images/aries.jpg",
    },
    taurus: {
      p: "Your mood should be good today, Taurus, although you should be careful not to rub it in others' faces. If people don't feel like being cheerful, don't force it on them. An important sense of duty is prominent and should be obeyed at all costs. Give your adventurous nature some sort of practical grounding that you can use to be more effective regarding whatever it is you do.",
      img: "images/taurus.jpg",
    },
    gemini: {
      p: `It isn't a good idea to talk behind other people's backs today, Gemini. If you have an issue with someone in particular, bring it up to that person directly. This isn't a good time to gossip. Maintaining trust is extremely important right now. This attitude will open many doors for you. Believe that the more you love others, the more love will be returned to you.
  
          You are down to earth but you need to believe in something more.`,
      img: "images/gemini.jpg",
    },
    cancer: {
      p: `Put some of your fantastic ideas to good use today, Cancer. It's one thing to be a genius with plenty of masterpieces floating around in your head. It's quite another to actually put things into motion. You may be full of talk, but today it's important to be full of action. Restriction and limitation are creeping in, so do what you can to get things in place before it's too late.
  
          You have natural intuition, and your gut is telling you something is not right. `,
      img: "images/cancer.jpg",
    },
    leo: {
      p: `This is a good day to follow through on projects, Leo. Leaving many unfinished matters in your life only creates clutter that keeps other things from entering the picture. Either dismiss the project entirely or finish it and move on to something else. Don't leave things hanging, including people. Tell others what's going on and you'll be more successful in the long run.`,
      img: "images/leo.jpg",
    },
    virgo: {
      p: `There could be some restrictions on your emotions today, Virgo. You'll find that a practical, grounded force is working against your intuitive understanding of whatever issue concerns you. Do your best to anchor yourself in the truth before you scatter seeds of erratic emotions all over the place. It's important for you to maintain stability at all times.`,
      img: "images/virgo.jpg",
    },
    libra: {
      p: `Feel free to take care of any restructuring in your life that needs to be done now, Libra. Change may be a bit scary at first, but realize that it's a necessary variable in order to make progress. You may not have to change your focus or destination too much, but it's possible that you'll need to adjust your course to get there.`,
      img: "images/libra.jpg",
    },
    scorpio: {
      p: `Your mood may be a bit detached and scattered today, Scorpio. This attitude could get you into trouble if you aren't careful. Make sure you keep at least one foot on the ground. It's important to stay strongly connected with reality or you could find yourself up a creek without a paddle. Feel free to get more deeply involved in a project that you might otherwise leave to others.`,
      img: "images/scorpio.jpg",
    },
    sagittarius: {
      p: `Seek the counsel of someone older and wiser today, Sagittarius. Whether you want to or not, you may encounter someone with authority who's likely to tell you what he or she thinks. Heed the advice that comes from others. There is a whole other perspective out there that you need to consider in order to bring things back to equilibrium.`,
      img: "images/sagittarius.jpg",
    },
    capricorn: {
      p: `Flamboyant shows of emotions may not be as welcome as usual today, Capricorn. Realize that you may need to put a damper on things in order to earn the respect of the people around you. Tone it down and understand the importance of grounding and stability. Strong forces could bring you down to this level whether you want them to or not, so why bother trying to resist?`,
      img: "/images/capricorn.jpg",
    },
    aquarius: {
      p: `There may be some tension today as you try to stabilize your emotions, Aquarius. There could be a force at work out there that's rather impersonal and detached. More than likely, this force doesn't relate as much to how you feel as it does to how well you've done the job. Stick to your tasks in a practical, grounded manner.`,
      img: "images/aquarius.jpg",
    },
    pisces: {
      p: `The tricky things to balance today are your emotions and sense of duty, Pisces. Try not to let the stress of having to complete a task leak into your state of mind. The problem is that your emotions may be running away more quickly than you can handle. Meanwhile, there's a bit of a slowdown when it comes to your sense of duty and responsibility.`,
      img: "images/pisces.jpg",
    },
  };
  const location = useLocation();

  const { firstName, lastName, birthDate, starSign } = location.state.data;

  const [data, setData] = useState([]);

  const fetchData = () => {
    fetch(`https://api.apiverve.com/v1/horoscope?birthdate=${birthDate}`, {
      headers: {
        Accept: "application/json",
        "x-api-key":import.meta.env.VITE_API_KEY,
      },
    })
      .then((response) => response.json())
      .then((json) => setData(json.data));
  };

  useEffect(() => {
    if (firstName === undefined) {
    } else {
      if (!data) {
        fetchData();
      }
    }
  }, [data]);
  //

  const navigate = useNavigate();

  return (
    <section className="container">
      <Header
        title={`My daily Horoscope`}
        subTitle={`
            Welcome to your daily horoscope ${firstName} ${lastName}! 
            It's a good day to be ${starSign}
          `}
      />
      <article>
        <img src={horoscope[starSign.toLowerCase()].img} alt="" />
        {data.length === 0 ? (
          <p>{horoscope[starSign.toLowerCase()].p}</p>
        ) : (
          <p>{data.horoscope}</p>
        )}
      </article>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </section>
  );
}

export default Horoscope;
