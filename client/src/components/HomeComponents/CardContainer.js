import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';

const CardContainer = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: theme.spacing(3),
    minHeight: '250px',
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[5],
    background: 'linear-gradient(135deg, #ffffff 30%, #f3e5f5 90%)',
  }));

export default CardContainer;