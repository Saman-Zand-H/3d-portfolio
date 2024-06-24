import Navbar from '../../../components/Navbar';
import {
  VerticalTimelineElement,
  VerticalTimeline,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import ContactCard from '../../../components/ContactCard';
import SkillCard from '../../../features/landing/components/SkillCard';
import ExperienceCard from '../../../features/landing/components/ExperienceCard';

const About = () => {
  const skills = [
    {
      name: 'HTML',
      imageUrl: '/images/html.svg',
    },
    {
      name: 'CSS',
      imageUrl: '/images/css.svg',
    },
    {
      name: 'JavaScript',
      imageUrl: '/images/javascript.svg',
    },
    {
      name: 'React',
      imageUrl: '/images/react.svg',
    },
    {
      name: 'Node.js',
      imageUrl: '/images/nodejs.svg',
    },
    {
      name: 'MongoDB',
      imageUrl: '/images/mongodb.svg',
    },
    {
      name: 'MySQL',
      imageUrl: '/images/mysql.svg',
    },
    {
      name: 'Git',
      imageUrl: '/images/git.svg',
    },
  ];

  const experiences = [
    {
      company_name: 'Google',
      title: 'Software Engineer',
      date: '2019 - Present',
      icon: '/images/google.svg',
      iconBg: '#4285F4',
      points: [
        'Developed and maintained the Google search engine.',
        'Worked on the Google Maps API.',
        'Collaborated with the Google Cloud team.',
      ],
    },
    {
      company_name: 'Facebook',
      title: 'Frontend Developer',
      date: '2017 - 2019',
      icon: '/images/facebook.svg',
      iconBg: '#1877F2',
      points: [
        'Designed and implemented the Facebook news feed.',
        'Worked on the Facebook Ads platform.',
        'Collaborated with the Facebook AI team.',
      ],
    },
    {
      company_name: 'Amazon',
      title: 'Full Stack Developer',
      date: '2015 - 2017',
      icon: '/images/amazon.svg',
      iconBg: '#FF9900',
      points: [
        'Developed and maintained the Amazon website.',
        'Worked on the Amazon Web Services platform.',
        'Collaborated with the Amazon Alexa team.',
      ],
    },
  ];

  return (
    <>
      <Navbar />
      <section className="max-container">
        <h1 className="head-text">
          Hello! I'm{' '}
          <span className="blue-gradient_text font-semibold drop-shadow">
            Saman
          </span>{' '}
          👋
        </h1>

        <div className="mt-5 gap-3 text-slate-500">
          <p>
            Software Engineer based in Iran, excelling in coding, designing
            databases, and creating clean code and robust architecture. Known
            for a fast learning ability and a commitment to technical
            excellence, I specialize in technical education through hands-on
            learning and building applications.
          </p>
        </div>

        <div className="flex flex-col py-10">
          <h3 className="subhead-text">Mys Skills</h3>

          <div className="mt-16 flex flex-wrap gap-12">
            {skills.map((skill, _) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
        </div>

        <div className="py-16">
          <h3 className="subhead-text">Work Experience.</h3>
          <div className="mt-5 flex flex-col gap-3 text-slate-500">
            <p>
              I've worked with all sorts of companies, leveling up my skills and
              teaming up with smart people. Here's the rundown:
            </p>
          </div>

          <div className="mt-12 flex">
            <VerticalTimeline>
              {experiences.map((experience, _) => (
                <ExperienceCard experience={experience} />
              ))}
            </VerticalTimeline>
          </div>
        </div>

        <hr className="border-slate-200" />

        <ContactCard />
      </section>
    </>
  );
};

export default About;
