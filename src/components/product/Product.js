import React, { useEffect, useState } from 'react';
import './product.css';
import { Box, Card, Grid,CardContent, Stack, Typography, useMediaQuery } from '@mui/material';
import ProductCard from './ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';
import { Link, useParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Loader from '../layout/Loader/Loader';
// import SelectComponent from './SelectComponent';
import { animalTypeLoadAction } from '../../actions/categories/animalTypeAction';
import { treatmentTypeLoadAction } from '../../actions/categories/treatmentTypeAction';
import { dailyEssentialsTypeLoadAction } from '../../actions/categories/dailyEssentialTypeAction';
import { medicalCareTypeLoadAction } from '../../actions/categories/medicalCareTypeAction';
import SearchBar from '../Home/SearchBar';
import MetaData from '../MetaData';
import { useAlert } from 'react-alert';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import {BsChevronExpand} from 'react-icons/bs';
//import SelectEssentialComponent from './SelectEssentialComponent';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Product = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const {error,loading,products,pages} = useSelector(state=>state.products)


  const { keyword,treatment,animal,essential,medical} = useParams()
  const { treatmentType } = useSelector(state => state.treatmentTypeAll)
  const { dailyEssentialType } = useSelector(state => state.dailyEssentialTypeAll)
  const { MedicalCareType } = useSelector(state => state.medicalCareTypeAll)
  const {animalType} = useSelector(state=>state.animalTypeAll)

  const [page, setPage ] = useState(1);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  //const [animal, setAnimal ] = useState();
  //const [essential, setEssential ] = useState();

  useEffect(()=>{
    if(error){
       alert.error(error);
       dispatch(clearErrors())
    }

   dispatch(getProduct(page,keyword,animal,treatment,essential,medical))
  },[dispatch,page,keyword,animal,treatment,essential,medical,error,alert])

useEffect(()=>{
  dispatch(animalTypeLoadAction())
  dispatch(treatmentTypeLoadAction())
  dispatch(dailyEssentialsTypeLoadAction())
  dispatch(medicalCareTypeLoadAction())

},[dispatch])
const isMobile = useMediaQuery('(max-width: 600px)'); // Define your breakpoint here

const handleFilterClick = () => {
  setIsFilterVisible(!isFilterVisible);
};

  // const handleChangeCategory=(e)=>{
  //     setAnimal(e.target.value)
  // }

  //for daily essentials to handle drop-down --> uncomment it if you want to use drop-down
  // const handleChangeEssentialCategory=(e)=>{
  //   setEssential(e.target.value)

  // }

  return (
    <div className='all-products'>
      <MetaData title="VetMedMan|Products-Shopping " />
      {
        loading ? <Loader /> : <>

        <SearchBar />
     <Box sx={{ bgcolor: '#fff', minHeight: '100vh',margin:'40px',borderRadius:'10px' }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
          {
            isMobile ? (
              <button className='filter-btn' onClick={handleFilterClick}>
                 {isFilterVisible ? 'Hide Filter' : 'Show Filter'}
              </button>
            ):(
              <Box sx={{ flex: 1, p: 2 ,  maxWidth: 300}}>
              <Card sx={{ minWidth: 170, mb: 3, mt: 3, p: 2 ,justifyContent:'center', alignItems:'center'}}>
            <Box sx={{ pb: 2 }}>
                <Typography component="h4" sx={{ color: '#217c04', fontWeight: 600, fontFamily:'Inter'  }}>
                          Sort by Animal
                </Typography>
                {
                animalType && animalType.map((animal) => (
                   <Link className='link' to={`/search/animal/${animal._id.toString()}`} key={animal._id}>
                <Typography variant="h6" color="text.primary" style={{borderBottom: '1px solid rgba(0, 0, 0, 0.205)'}}>
                          {animal.animalName}
                </Typography>
             </Link>
                ))
              }
          </Box>
                {/* <SelectComponent handleChangeCategory={handleChangeCategory} animal={animal} />  */}
              </Card>
  
  
  
  
        {/* treatment category  card*/}
      <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="treatment-content"
        id="treatment-header"
      >
        <Typography component="h4" sx={{ color: '#217c04', fontWeight: 600 ,fontFamily: 'Inter'}}>
          Sort by Treatment 
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ pb: 2 }}>
          {treatmentType &&
            treatmentType.map((treatment) => (
              <Link
                className="link"
                to={`/search/treatment/${treatment._id.toString()}`}
                key={treatment._id}
              >
                    <Typography variant="h6" color="text.primary" style={{borderBottom: '1px solid rgba(0, 0, 0, 0.205)'}}>
                      {treatment.TreatmentTypeName}
                    </Typography>
              </Link>
            ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  
  
              {/* treatment-card without accordian  */}
            {/* <Card sx={{ minWidth: 150, mb: 3,mt:2, p: 2 }}>
            <Box sx={{ pb: 2 }}>
                <Typography component="h4" sx={{ color: '#217c04', fontWeight: 600 }}>
                          SORT BY TREATMENT
                </Typography>
                {
                treatmentType && treatmentType.map((treatment) => (
                  <Link className='link' to={`/search/treatment/${treatment._id.toString()}`} key={treatment._id}>
                <Card sx={{ minWidth: 150, mb: 1,mt:1, p: 1}}>
                <CardContent>
                <Typography variant="h6" color="text.primary">
                          {treatment.TreatmentTypeName}
                </Typography>
                </CardContent>
              </Card>
              </Link>
                ))
              }
          </Box>
          </Card> */}
  
              {/* daily-Essential-Card */}
              <Card sx={{ minWidth: 150, mb: 3,mt:2, p: 2 }}>
            <Box sx={{ pb: 2 }}>
                <Typography component="h4" sx={{ color: '#217c04', fontWeight: 600 ,fontFamily:'Inter'}}>
                Daily Essentials
                </Typography>
                {
                dailyEssentialType && dailyEssentialType.map((essential) => (
                  
                  <Link className='link' to={`/search/essential/${essential._id.toString()}`} key={essential._id}>
                <Card sx={{ minWidth: 150, mb: 1,mt:1, p: 1}}>
                <Typography variant="h6" color="text.primary">
                          {essential.essentialName}
                </Typography>
              </Card>
              </Link>
                ))
              }
          </Box>
          </Card>
  
          {/* drop-down */}
          {/* <SelectEssentialComponent handleChangeEssentialCategory={handleChangeEssentialCategory} essential={essential}/> */}
  
  
          {/* medical-care-card */}
          <Card sx={{ minWidth: 150, mb: 3,mt:2, p: 2 }}>
            <Box sx={{ pb: 2 }}>
                <Typography component="h4" sx={{ color: '#217c04', fontWeight: 600 , fontFamily:'Inter'}}>
                          Sort by Medical Care Use
                </Typography>
                {
                MedicalCareType && MedicalCareType.map((medical) => (
                   <Link className='link' to={`/search/medical/${medical._id.toString()}`} key={medical._id}>
                <Card sx={{ minWidth: 150, mb: 1,mt:1, p: 1}}>
                <Typography variant="h6" color="text.primary">
                          {medical.medicalCareName}
                </Typography>
              </Card>
             </Link>
                ))
              }
          </Box>
          </Card>
    </Box>
            )
          }


          {/* mobile view show filters box */}

           {isMobile && isFilterVisible && (
               <Box sx={{ flex: 1, p: 2 }}>
               <Card sx={{ minWidth: 170, mb: 3, mt: 3, p: 2 }}>
             <Box sx={{ pb: 2 }}>
                 <Typography component="h4" sx={{ color: '#217c04', fontWeight: 600, fontFamily:'Inter' }}>
                           SORT BY ANIMAL
                 </Typography>
                 {
                 animalType && animalType.map((animal) => (
                    <Link className='link' to={`/search/animal/${animal._id.toString()}`} key={animal._id}>
                 <Typography variant="h6" color="text.primary" style={{borderBottom: '1px solid rgba(0, 0, 0, 0.205)'}}>
                           {animal.animalName}
                 </Typography>
              </Link>
                 ))
               }
           </Box>
                 {/* <SelectComponent handleChangeCategory={handleChangeCategory} animal={animal} />  */}
               </Card>
   
   
   
   
         {/* treatment category  card*/}
       <Card sx={{ minWidth: 150, mb: 3, mt: 2, p: 2 }}>
       <Accordion>
       <AccordionSummary
         expandIcon={<BsChevronExpand />}
         aria-controls="treatment-content"
         id="treatment-header"
       >
         <Typography component="h4" sx={{ color: '#217c04', fontWeight: 600 ,fontFamily: 'Inter'}}>
           SORT BY TREATMENT
         </Typography>
       </AccordionSummary>
       <AccordionDetails>
         <Box sx={{ pb: 2 }}>
           {treatmentType &&
             treatmentType.map((treatment) => (
               <Link
                 className="link"
                 to={`/search/treatment/${treatment._id.toString()}`}
                 key={treatment._id}
               >
                   <CardContent>
                     <Typography variant="h6" color="text.primary">
                       {treatment.TreatmentTypeName}
                     </Typography>
                   </CardContent>
               </Link>
             ))}
         </Box>
       </AccordionDetails>
     </Accordion>
   </Card>
   
   
               {/* treatment-card without accordian  */}
             {/* <Card sx={{ minWidth: 150, mb: 3,mt:2, p: 2 }}>
             <Box sx={{ pb: 2 }}>
                 <Typography component="h4" sx={{ color: '#217c04', fontWeight: 600 }}>
                           SORT BY TREATMENT
                 </Typography>
                 {
                 treatmentType && treatmentType.map((treatment) => (
                   <Link className='link' to={`/search/treatment/${treatment._id.toString()}`} key={treatment._id}>
                 <Card sx={{ minWidth: 150, mb: 1,mt:1, p: 1}}>
                 <CardContent>
                 <Typography variant="h6" color="text.primary">
                           {treatment.TreatmentTypeName}
                 </Typography>
                 </CardContent>
               </Card>
               </Link>
                 ))
               }
           </Box>
           </Card> */}
   
               {/* daily-Essential-Card */}
               <Card sx={{ minWidth: 150, mb: 3,mt:2, p: 2 }}>
             <Box sx={{ pb: 2 }}>
                 <Typography component="h4" sx={{ color: '#217c04', fontWeight: 600 }}>
                           OUR DAILY ESSENTIALS
                 </Typography>
                 {
                 dailyEssentialType && dailyEssentialType.map((essential) => (
                   
                   <Link className='link' to={`/search/essential/${essential._id.toString()}`} key={essential._id}>
                 <Card sx={{ minWidth: 150, mb: 1,mt:1, p: 1}}>
                 <CardContent>
                 <Typography variant="h6" color="text.primary">
                           {essential.essentialName}
                 </Typography>
                 </CardContent>
               </Card>
               </Link>
                 ))
               }
           </Box>
           </Card>
   
           {/* drop-down */}
           {/* <SelectEssentialComponent handleChangeEssentialCategory={handleChangeEssentialCategory} essential={essential}/> */}
   
   
           {/* medical-care-card */}
           <Card sx={{ minWidth: 150, mb: 3,mt:2, p: 2 }}>
             <Box sx={{ pb: 2 }}>
                 <Typography component="h4" sx={{ color: '#217c04', fontWeight: 600 }}>
                           SORT BY Medical
                 </Typography>
                 {
                 MedicalCareType && MedicalCareType.map((medical) => (
                    <Link className='link' to={`/search/medical/${medical._id.toString()}`} key={medical._id}>
                 <Card sx={{ minWidth: 150, mb: 1,mt:1, p: 1}}>
                 <CardContent>
                 <Typography variant="h6" color="text.primary">
                           {medical.medicalCareName}
                 </Typography>
                 </CardContent>
               </Card>
              </Link>
                 ))
               }
           </Box>
           </Card>
     </Box>
      )}

       
       
          {/* main card */}
          
          {
            products && products.length === 0 ? <>
                    <Box
                       sx={{
                        minHeight: '350px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>

        <Grid container spacing={0} sx={{ height: '100%',width:'70vw' }}>
      <Grid item xs={12} sx={{ backgroundColor: '#fff', textAlign: 'center' }}>
        <Box sx={{ minHeight: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <h1>No result found!</h1>
        </Box>
      </Grid>
    </Grid>
                  </Box>
            </> :
            <>
            <div className='product-main-container' style={{ display: 'flex', flexDirection: 'column' }}>
           <Box sx={{ flex: 6, p: 1,mt:4 }}>
           <Box sx={{ minHeight: '350px', display: 'flex', justifyContent: 'center', alignItems: 'center',flexDirection: 'column' }}>
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </Box>
            <Stack spacing={2} >
            <Pagination variant='outlined' className='pagination' page={page} count={pages === 0 ? 1 : pages} onChange={(event, value) => setPage(value)}
              style={{zIndex:0}}
             />
          </Stack>
          </Box>
          </div>
            </>
          }
        </Stack>
      </Box>
        </>
      }
     
    </div>
  );
};

export default Product;
