import { styled } from '@mui/material/styles';

const HeroContent = styled('div')(({ theme }) => ({
    backgroundColor: '#ffebee',
    backgroundImage: 'linear-gradient(135deg, #ffebee 30%, #ffcdd2 90%)',
    padding: theme.spacing(8, 0, 6),
    marginTop: 30,
    marginBottom: 60,
    borderRadius: theme.spacing(2),
  }));

export default HeroContent;