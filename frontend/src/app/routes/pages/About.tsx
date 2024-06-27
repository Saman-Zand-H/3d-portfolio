import Navbar from '../../../components/Navbar';
import { VerticalTimeline } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import ContactCard from '../../../components/ContactCard';
import SkillCard from '../../../features/landing/components/SkillCard';
import ExperienceCard from '../../../features/landing/components/ExperienceCard';
import { skills, experiences } from '../../../features/landing/constants';

const About = () => {
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
          <h3 className="subhead-text">My Skills</h3>

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
              {experiences.map((experience, index) => (
                <ExperienceCard experience={experience} key={index} />
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
