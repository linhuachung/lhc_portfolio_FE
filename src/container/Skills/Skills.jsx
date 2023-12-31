import React, {Fragment, useEffect, useState} from 'react'
import {motion} from 'framer-motion'
import {Tooltip as ReactTooltip} from 'react-tooltip'

import {AppWrap, MotionWrap} from '../../wrapper'
import {client, urlFor} from '../../client'
import './Skills.scss'
import {dataExperiences} from './workExperiences-data'

const Skills = () => {
  const [skills, setSkills] = useState([])
  useEffect(() => {
    const skillsQuery = '*[_type == "skills"]'
    client.fetch(skillsQuery).then((data) => {
      setSkills(data)
    })
  }, [])

  return (
    <>
      <h2 className='head-text'>Skills & Experiences</h2>

      <div className='app__skills-container'>
        <motion.div className='app__skills-list'>
          {skills.map((skill) => (
            <motion.div
              whileInView={{opacity: [0, 1]}}
              transition={{duration: 0.5}}
              className='app__skills-item app__flex'
              key={skill._id}
            >
              <div
                className='app__flex'
                style={{backgroundColor: skill.bgColor}}
              >
                <img src={urlFor(skill.icon)} alt={skill.name} />
              </div>
              <p className='p-text'>{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>
        <div className='app__skills-exp'>
          {dataExperiences.map((experience) => (
            <motion.div
              className='app__skills-exp-item'
              key={experience.year}
            >
              <div className='app__skills-exp-year'>
                <p className='bold-text'>{experience.year}</p>
              </div>
              <motion.div className='app__skills-exp-works'>
                {experience.works.map((work) => (
                  <Fragment key={work.name}>
                    <motion.div
                      whileInView={{opacity: [0, 1]}}
                      transition={{duration: 0.5}}
                      className={'app__skills-exp-work'}
                      data-tooltip-id={'tooltipId'}
                      data-tooltip-content={work.desc}
                    >
                      <h4 className='bold-text'>{work.name}</h4>
                      <p className='p-text'>{work.company}</p>
                    </motion.div>
                  </Fragment>
                ))}
              </motion.div>
            </motion.div>
          ))}
          <ReactTooltip
            effect='solid'
            arrowColor='#fff'
            style={{
              backgroundColor: `#ffffff`,
              color: '#6b7688',
              borderRadius: 5,
              maxWidth: 500,
              boxShadow: ' 0 0 25px rgba(0, 0, 0, 0.1)',
              padding: '1rem',
              lineHeight: 1.5
            }}
            id='tooltipId'
          />
        </div>
      </div>
    </>
  )
}

export default AppWrap(
  MotionWrap(Skills, 'app__skills'),
  'skills',
  'app__whitebg'
)
