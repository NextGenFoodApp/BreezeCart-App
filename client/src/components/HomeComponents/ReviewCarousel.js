import React, { useState, useEffect, useRef } from 'react';
import { Box, Card, CardContent, Typography, Avatar, IconButton, useTheme } from '@mui/material';
import { Star, ChevronLeft, ChevronRight } from '@mui/icons-material';

const reviews = [
    {
        id: 1,
        name: 'Sarah Johnson',
        rating: 5,
        comment: 'BreezeCart made my grocery shopping so convenient! Delivery was fast and everything was fresh.',
        avatar: 'SJ'
    },
    {
        id: 2,
        name: 'Michael Chen',
        rating: 4,
        comment: 'Great selection and easy to use app. Would give 5 stars if delivery times were more flexible.',
        avatar: 'MC'
    },
    {
        id: 3,
        name: 'Emma Williams',
        rating: 5,
        comment: 'Love the weekly deals and how I can schedule my deliveries in advance. Highly recommend!',
        avatar: 'EW'
    },
    {
        id: 4,
        name: 'David Kim',
        rating: 5,
        comment: 'The best grocery delivery service I\'ve used. Customer service is excellent too!',
        avatar: 'DK'
    },
    {
        id: 5,
        name: 'Lisa Rodriguez',
        rating: 4,
        comment: 'Saves me so much time. Quality is always good and prices are reasonable.',
        avatar: 'LR'
    }
];

const ReviewsCarousel = () => {
    const theme = useTheme();
    const [activeIndex, setActiveIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const containerRef = useRef(null);

    const handleNext = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setActiveIndex(prev => (prev + 1) % reviews.length);
    };

    const handlePrev = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setActiveIndex(prev => (prev - 1 + reviews.length) % reviews.length);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleTransitionEnd = () => setIsTransitioning(false);
        const container = containerRef.current;
        container?.addEventListener('transitionend', handleTransitionEnd);
        return () => container?.removeEventListener('transitionend', handleTransitionEnd);
    }, []);

    // Clone first and last items for seamless looping
    const items = [
        reviews[reviews.length - 1], // last item
        ...reviews,                  // all items
        reviews[0]                   // first item
    ];

    return (
        <Box sx={{ position: 'relative', width: '100%' }}>
            <IconButton
                onClick={handlePrev}
                sx={{
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 2,
                    backgroundColor: 'rgba(255,255,255,0.8)',
                    '&:hover': {
                        backgroundColor: 'rgba(255,255,255,1)'
                    }
                }}
            >
                <ChevronLeft fontSize="large" />
            </IconButton>

            <Box
                ref={containerRef}
                sx={{
                    display: 'flex',
                    overflow: 'hidden',
                    py: 2,
                    scrollSnapType: 'x mandatory',
                    '&::-webkit-scrollbar': { display: 'none' },
                    msOverflowStyle: 'none',
                    scrollbarWidth: 'none',
                    position: 'relative'
                }}
            >
                {items.map((review, index) => (
                    <Box
                        key={`${review.id}-${index}`}
                        sx={{
                            minWidth: '20%',
                            maxWidth: '50%',
                            px: 2,
                            transform: `translateX(-${(activeIndex + 1) * 100}%)`,
                            transition: isTransitioning ? 'transform 0.5s ease' : 'none'
                        }}
                    >
                        <Card sx={{
                            height: '90%',
                            p: 3,
                            borderRadius: 4,
                            boxShadow: 3,
                            textAlign: 'center',
                            mx: 'auto',
                            maxWidth: '600px'
                        }}>
                            <Avatar
                                sx={{
                                    width: 80,
                                    height: 80,
                                    fontSize: '2rem',
                                    bgcolor: theme.palette.primary.main,
                                    mx: 'auto',
                                    mb: 3
                                }}
                            >
                                {review.avatar}
                            </Avatar>
                            <Typography variant="h6" gutterBottom>
                                {review.name}
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        color={i < review.rating ? 'primary' : 'disabled'}
                                        fontSize="medium"
                                    />
                                ))}
                            </Box>
                            <Typography variant="body1" color="text.secondary">
                                "{review.comment}"
                            </Typography>
                        </Card>
                    </Box>
                ))}
            </Box>

            <IconButton
                onClick={handleNext}
                sx={{
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 2,
                    backgroundColor: 'rgba(255,255,255,0.8)',
                    '&:hover': {
                        backgroundColor: 'rgba(255,255,255,1)'
                    }
                }}
            >
                <ChevronRight fontSize="large" />
            </IconButton>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                {reviews.map((_, index) => (
                    <Box
                        key={index}
                        onClick={() => {
                            if (!isTransitioning) {
                                setIsTransitioning(true);
                                setActiveIndex(index);
                            }
                        }}
                        sx={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            bgcolor: activeIndex === index ? 'primary.main' : 'grey.400',
                            mx: 0.5,
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease'
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default ReviewsCarousel;