'use client'
import React from 'react'
import Model from "react-body-highlighter";
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointer } from '@fortawesome/free-solid-svg-icons';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import { Reload } from '../globals/Reload';

export const BodyViewer = ({handleSearch}) => {
  const [open, setOpen] = React.useState(false);
  const [localLoad, setlocalLoad] = React.useState(false);
  const [selectedMuscles, setSelectedMuscles] = React.useState([]);
  const [uniqueMuscles, setuniqueMuscles] = React.useState([]); 

  React.useEffect(() => {
    let SearchMuscles = []
      
      const updateUniqueMuscles = () => {
        selectedMuscles.map((M) => {
          SearchMuscles.push(M.muscle)
        })
        const uniqueMuscles = [...new Set(
          SearchMuscles.map(muscle => {
            if (muscle === 'abs') return 'abductors';
            if (muscle === 'obliques') return 'abdominals';
            if (muscle === 'gluteal') return 'glutes';
            if (muscle === 'hamstring') return 'hamstrings';
            if (muscle === 'forearm') return 'forearms';
            if (muscle === 'adductor') return 'adductors';
            if (muscle === 'trapezius') return 'traps';
            if (muscle === 'right-soleus') return 'calves';
            if (muscle === 'lower-back') return 'lower_back';
            if (muscle === 'upper-back' || muscle === 'back-deltoids') return ['middle_back', 'lats'];
            return muscle;
          }).flat() //matching the ningasApi muscles options
        )].filter(muscle => muscle !== 'head' && muscle !== 'knees' && muscle !== "front-deltoids");
        setuniqueMuscles(uniqueMuscles)
        console.log('uniqueMuscles', uniqueMuscles);
      }
    updateUniqueMuscles()
    }, [selectedMuscles]);
  
  const SearchBySelectedMuscles = async () => {
    if (uniqueMuscles.length > 0) {
      setlocalLoad(true)
      await handleSearch(uniqueMuscles)
      setlocalLoad(false)
    setOpen(false)
      
    }
    else {
      console.log('empty uniqueMuscles');
    }
  }
  return (
      
    <React.Fragment>
      <button className='text-white flex flex-row items-center font-bold gap-2 text-xs p-2 border border-2 border-slate-200 cursor-pointer hover:bg-[#181616] transition-all duration-300 rounded-lg ' onClick={() => setOpen(true)}>
      <FontAwesomeIcon icon={faHandPointer} style={{ color: "#ffffff" , fontSize:'1rem'}}   />
      Pick a muscle
      </button>
      
      <Modal
        keepMounted
       aria-labelledby="modal-title"
       aria-describedby="modal-desc"
       open={open}
       onClose={() => setOpen(false)}
       sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
     >
       <Sheet
         variant="outlined"
         sx={{
           maxWidth: 500,
           borderRadius: 'md',
           p: 3,
           boxShadow: 'lg',
         }}
       >
         <ModalClose variant="plain" sx={{ m: 1 }} />
         <Typography
           component="h2"
           id="modal-title"
           level="h4"
           textColor="inherit"
           fontWeight="lg"
           mb={1}
         >
           Pick A Muscle
         </Typography>
          <Typography id="modal-desc" textColor="text.tertiary">
          {localLoad &&
      <Reload/> }
          <Tabs size="sm" aria-label="Basic tabs" defaultValue={0}>
  <TabList>
    <Tab>Front</Tab>
    <Tab>Back</Tab>
  </TabList>
              <TabPanel value={0}>
              <div className='flex flex-row justify-center gap-2'>
                
  <Model
                  style={{width:'50%'}}
                  highlightedColors={["#e65a5a", "#db2f2f"]}
                    onClick={
                      (muscle) => 
                        setSelectedMuscles([...selectedMuscles, muscle])
      }
                />
                <ul>
                    {uniqueMuscles.map((uniqueMuscle) => (
                      <li key={uniqueMuscle}>{uniqueMuscle}</li>
                    ))}
                    
                  </ul>
                  </div>
              </TabPanel>
              
  <TabPanel value={1}>
                <div className='flex flex-row justify-center gap-2'>
                <Model
                  style={{ width: '50%' }}
              type="posterior"
              highlightedColors={['#0984e3', '#74b9ff']}
              onClick={
                (muscle) => 
                  setSelectedMuscles([...selectedMuscles, muscle])
}
                  />
                  <ul>
                    {uniqueMuscles.map((uniqueMuscle) => (
                      <li key={uniqueMuscle}
                       >{uniqueMuscle}</li>
                    ))}
                    
                  </ul>
                </div>
              </TabPanel>
              

</Tabs>
         
            <Button variant='outlined' color='primary' className='w-full'
            onClick={SearchBySelectedMuscles}>Search</Button>
         </Typography>
       </Sheet>
     </Modal>
   </React.Fragment>
 
  )
}
