import React from 'react';
import { Box, Typography, Container, Link, Divider, Grid, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: '#f5f7fa',
                borderTop: '1px solid #e2e8f0',
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4} justifyContent="space-between">
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            ICECD Community
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Creating an entrepreneurial ecosystem through increased access to resources, mentorship, and community support.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            Connect with Us
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton aria-label="facebook" size="small">
                                <Facebook />
                            </IconButton>
                            <IconButton aria-label="twitter" size="small">
                                <Twitter />
                            </IconButton>
                            <IconButton aria-label="instagram" size="small">
                                <Instagram />
                            </IconButton>
                            <IconButton aria-label="linkedin" size="small">
                                <LinkedIn />
                            </IconButton>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            Contact
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Email: info@icecd.org
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Phone: +91 XXXX XXXX XX
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Website: <Link href="https://icecd.org/" target="_blank" rel="noopener">icecd.org</Link>
                        </Typography>
                    </Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" color="text.secondary" align="center">
                    © {new Date().getFullYear()} ICECD. All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;