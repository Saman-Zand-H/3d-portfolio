import { VerticalTimelineElement } from 'react-vertical-timeline-component';

type ExperienceCardProps = {
  experience: {
    company_name: string;
    title: string;
    date: string;
    icon: string;
    iconBg: string;
    points: string[];
  };
};

const ExperienceCard = (props: ExperienceCardProps) => {
  const { experience } = props;

  return (
    <VerticalTimelineElement
      key={experience.company_name}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className="flex h-full w-full items-center justify-center">
          <img
            src={experience.icon}
            alt={experience.company_name}
            className="h-[60%] w-[60%] object-contain"
          />
        </div>
      }
      contentStyle={{
        borderBottom: '8px',
        borderStyle: 'solid',
        borderBottomColor: experience.iconBg,
        boxShadow: 'none',
      }}
    >
      <div>
        <h3 className="font-poppins text-xl font-semibold text-black">
          {experience.title}
        </h3>
        <p
          className="text-base font-medium text-black-500"
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
      </div>

      <ul className="my-5 ml-5 list-disc space-y-2">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="pl-1 text-sm font-normal text-black-500/50"
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

export default ExperienceCard;
