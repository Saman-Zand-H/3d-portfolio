import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import { Education } from '../types';

type EducationCardProps = {
  education: Education;
};

const EducationCard = ({ education }: EducationCardProps) => {
  return (
    <VerticalTimelineElement
      key={education.university + education.degree + education.field}
      date={education.date}
      iconStyle={{ background: education.iconBg }}
      icon={
        <div className="flex h-full w-full items-center justify-center">
          <img
            src={education.logo}
            alt={education.university}
            className="h-[60%] w-[60%] object-contain"
          />
        </div>
      }
      contentStyle={{
        borderBottom: '8px',
        borderStyle: 'solid',
        borderBottomColor: education.iconBg,
        boxShadow: 'none',
      }}
    >
      <div>
        <h3 className="font-poppins text-xl font-semibold text-black">
          {education.degree} of {education.field}
        </h3>
        <p
          className="text-base font-medium text-black-500"
          style={{ margin: 0 }}
        >
          {education.university}
        </p>
        <p>
          <small>{education.location}</small>
        </p>
        <p className="text-base font-medium text-black-500">
          <small>{education.subfield}</small>
        </p>
      </div>
    </VerticalTimelineElement>
  );
};

export default EducationCard;
