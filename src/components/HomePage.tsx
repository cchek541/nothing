import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Menu, X, Circle, Square, Triangle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Link } from "./ui/link";

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom right, var(--color-gray-50), white);
  position: relative;
  overflow: hidden;
`;

const Nav = styled.nav`
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  
  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: 300;
  letter-spacing: 0.05em;
  color: var(--color-gray-800);
`;

const DesktopNav = styled.div`
  display: none;
  
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
  }
  
  & > * + * {
    margin-left: 2rem;
  }
`;

const MobileNav = styled.div<{ isOpen: boolean }>`
  display: ${props => props.isOpen ? 'block' : 'none'};
  position: absolute;
  top: 5rem;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(4px);
  z-index: 20;
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-gray-100);
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  
  & > * + * {
    margin-top: 1rem;
  }
`;

const StyledLink = styled(Link)`
  color: var(--color-gray-600);
  transition: color 300ms;
  
  &:hover {
    color: var(--color-gray-900);
  }
`;

const Main = styled.main`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 0 1.5rem;
  text-align: center;
`;

const Content = styled.div`
  max-width: 56rem;
  margin: 0 auto;
  
  & > * + * {
    margin-top: 2rem;
  }
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: 200;
  color: var(--color-gray-900);
  letter-spacing: 0.05em;
  line-height: 1;
  
  @media (min-width: 768px) {
    font-size: 6rem;
  }
  
  @media (min-width: 1024px) {
    font-size: 8rem;
  }
`;

const QuoteContainer = styled.div`
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Quote = styled.p<{ isActive: boolean }>`
  font-size: 1.125rem;
  color: var(--color-gray-600);
  font-weight: 300;
  max-width: 42rem;
  line-height: 1.625;
  transition: opacity 1000ms;
  opacity: ${props => props.isActive ? 1 : 0};
  position: absolute;
  
  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  
  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

const ShapeContainer = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
`;

const StyledCircle = styled(Circle)<{ $x: number; $y: number }>`
  position: absolute;
  top: 5rem;
  left: 2.5rem;
  width: 1rem;
  height: 1rem;
  color: var(--color-gray-200);
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  transform: translate(
    ${props => props.$x * 0.01}px,
    ${props => props.$y * 0.01}px
  );
`;

const StyledSquare = styled(Square)<{ $x: number; $y: number }>`
  position: absolute;
  top: 10rem;
  right: 5rem;
  width: 1.5rem;
  height: 1.5rem;
  color: var(--color-gray-100);
  animation: bounce 1s infinite;
  transform: translate(
    ${props => props.$x * -0.02}px,
    ${props => props.$y * 0.015}px
  );
`;

const StyledTriangle = styled(Triangle)<{ $x: number; $y: number }>`
  position: absolute;
  bottom: 8rem;
  left: 25%;
  width: 1.25rem;
  height: 1.25rem;
  color: #f3f4f6;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  transform: translate(
    ${props => props.$x * 0.015}px,
    ${props => props.$y * -0.01}px
  );
`;

const Section = styled.section<{ $isGray?: boolean }>`
  position: relative;
  z-index: 10;
  padding: 5rem 1.5rem;
  ${props => props.$isGray && `
    background-color: rgba(249, 250, 251, 0.5);
  `}
`;

const SectionContent = styled.div<{ $maxWidth?: string }>`
  max-width: ${props => props.$maxWidth || '56rem'};
  margin: 0 auto;
`;

const Grid = styled.div<{ $columns?: number }>`
  display: grid;
  gap: ${props => props.$columns === 3 ? '2rem' : '3rem'};
  align-items: center;
  
  @media (min-width: 768px) {
    grid-template-columns: ${props => 
      props.$columns === 3 
        ? 'repeat(3, minmax(0, 1fr))' 
        : 'repeat(2, minmax(0, 1fr))'
    };
  }
`;

const CardContent = styled.div`
  text-align: center;
  
  & > * + * {
    margin-top: 1rem;
  }
`;

const IconContainer = styled.div<{ $size?: string }>`
  width: ${props => props.$size || '3rem'};
  height: ${props => props.$size || '3rem'};
  margin: 0 auto;
  background-color: var(--color-gray-100);
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SectionTitle = styled.h2`
  font-size: 2.25rem;
  font-weight: 300;
  color: var(--color-gray-900);
  margin-bottom: 1.5rem;
  
  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const CenteredSectionTitle = styled(SectionTitle)`
  text-align: center;
  margin-bottom: 4rem;
`;

const Paragraph = styled.p`
  color: var(--color-gray-600);
  line-height: 1.625;
  font-size: 1.125rem;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 300;
  color: var(--color-gray-900);
`;

const CardParagraph = styled.p`
  color: var(--color-gray-600);
  font-size: 0.875rem;
  line-height: 1.625;
`;

const Footer = styled.footer`
  position: relative;
  z-index: 10;
  padding: 3rem 1.5rem;
  border-top: 1px solid var(--color-gray-200);
`;

const FooterContent = styled.div`
  max-width: 56rem;
  margin: 0 auto;
  text-align: center;
`;

const FooterLogo = styled.div`
  font-size: 1.5rem;
  font-weight: 300;
  letter-spacing: 0.05em;
  color: var(--color-gray-800);
  margin-bottom: 1rem;
`;

const FooterText = styled.p`
  color: var(--color-gray-500);
  font-size: 0.875rem;
`;

const HomePage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentQuote, setCurrentQuote] = useState(0);

  const quotes = [
    "Nothing is everything, and everything is nothing.",
    "In the space between thoughts, infinite possibilities exist.",
    "The art of doing nothing is the highest form of action.",
    "Emptiness is not absence, but presence of space.",
    "Nothing matters, and that's what makes everything matter.",
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <Container>
      {/* Floating geometric shapes */}
      <ShapeContainer>
        <StyledCircle $x={mousePosition.x} $y={mousePosition.y} />
        <StyledSquare $x={mousePosition.x} $y={mousePosition.y} />
        <StyledTriangle $x={mousePosition.x} $y={mousePosition.y} />
      </ShapeContainer>

      {/* Navigation */}
      <Nav>
        <Logo>nothing</Logo>

        {/* Desktop Navigation */}
        <DesktopNav>
          <StyledLink href="#about">About</StyledLink>
          <StyledLink href="#philosophy">Philosophy</StyledLink>
          <StyledLink href="#contact">Contact</StyledLink>
        </DesktopNav>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </Nav>

      {/* Mobile Navigation */}
      <MobileNav isOpen={isMenuOpen}>
        <MobileNavLinks>
          <StyledLink href="#about" onClick={() => setIsMenuOpen(false)}>About</StyledLink>
          <StyledLink href="#philosophy" onClick={() => setIsMenuOpen(false)}>Philosophy</StyledLink>
          <StyledLink href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</StyledLink>
        </MobileNavLinks>
      </MobileNav>

      {/* Hero Section */}
      <Main>
        <Content>
          <Title>nothing</Title>

          <QuoteContainer>
            {quotes.map((quote, index) => (
              <Quote key={index} isActive={index === currentQuote}>
                {quote}
              </Quote>
            ))}
          </QuoteContainer>

          <ButtonGroup>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-3 text-gray-700 border-gray-300 hover:bg-gray-50 transition-all duration-300"
            >
              Explore Nothing
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="px-8 py-3 text-gray-600 hover:text-gray-900 transition-all duration-300"
            >
              Learn More
            </Button>
          </ButtonGroup>
        </Content>
      </Main>

      {/* Content Sections */}
      <Section id="about">
        <SectionContent>
          <Grid>
            <div>
              <SectionTitle>About Nothing</SectionTitle>
              <Paragraph>
                Nothing is not the absence of something, but the presence of infinite possibility. In the space between
                thoughts, between breaths, between moments, lies the essence of pure potential.
              </Paragraph>
            </div>
            <Card className="p-8 bg-white/50 backdrop-blur-sm border-gray-200">
              <CardContent>
                <IconContainer>
                  <Circle size={32} color="#9ca3af" />
                </IconContainer>
                <CardTitle>Embrace Emptiness</CardTitle>
                <CardParagraph>
                  Find peace in the void, clarity in the silence, and wisdom in the space between.
                </CardParagraph>
              </CardContent>
            </Card>
          </Grid>
        </SectionContent>
      </Section>

      <Section id="philosophy" $isGray>
        <SectionContent $maxWidth="72rem">
          <CenteredSectionTitle>The Philosophy of Nothing</CenteredSectionTitle>

          <Grid $columns={3}>
            {[
              {
                title: "Minimalism",
                description: "Less is more. In removing the unnecessary, we discover what truly matters.",
                icon: Square,
              },
              {
                title: "Mindfulness",
                description: "Present moment awareness. Finding stillness in the chaos of existence.",
                icon: Circle,
              },
              {
                title: "Simplicity",
                description: "Pure essence. Stripping away complexity to reveal fundamental truth.",
                icon: Triangle,
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="p-8 bg-white/70 backdrop-blur-sm border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <CardContent>
                  <IconContainer $size="3rem">
                    <item.icon size={24} color="#6b7280" />
                  </IconContainer>
                  <CardTitle>{item.title}</CardTitle>
                  <CardParagraph>{item.description}</CardParagraph>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </SectionContent>
      </Section>

      <Section id="contact">
        <SectionContent $maxWidth="42rem">
          <div style={{ textAlign: 'center' }}>
            <SectionTitle>Connect with Nothing</SectionTitle>
            <Paragraph style={{ marginBottom: '2rem' }}>
              Sometimes the most profound connections happen in silence. Reach out when you're ready to explore the space
              between.
            </Paragraph>
            <Button 
              size="lg" 
              className="px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white transition-all duration-300"
            >
              Get in Touch
            </Button>
          </div>
        </SectionContent>
      </Section>

      {/* Footer */}
      <Footer>
        <FooterContent>
          <FooterLogo>nothing</FooterLogo>
          <FooterText>
            © {new Date().getFullYear()} Nothing. All rights reserved. Or perhaps, nothing is reserved.
          </FooterText>
        </FooterContent>
      </Footer>
    </Container>
  );
};

export default HomePage; 