"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";

import homeContent from "@/data/homeContent";
import ThemeToggle from "../../common/ThemeToggle";
import {
  HeaderContainer,
  TopBar,
  TopBarContent,
  ContactInfo,
  ContactItem,
  MainNav,
  NavContent,
  Logo,
  LogoText,
  NavLinks,
  NavLink,
  MobileMenuButton,
  LogoImage,
} from "./Layout.styles";
import { Instagram, Youtube, Twitter, Facebook } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = homeContent.navItems || [];

  return (
    <HeaderContainer $isScrolled={isScrolled}>
      <TopBar>
        <TopBarContent>
          <ContactInfo>
            <ContactItem>
              <Phone size={16} />
              <span>+223 20 20 20 20</span>
            </ContactItem>
            <ContactItem>
              <Mail size={16} />
              <span>contact@adrs.ml</span>
            </ContactItem>
            <ContactItem>
              <MapPin size={16} />
              <span>Kita, Mali</span>
            </ContactItem>
          </ContactInfo>
          <ContactInfo>
            <ContactItem title="Facebook">
              <Facebook size={20} style={{cursor: "pointer"}}/>
            </ContactItem>
            <ContactItem title="Twitter">
              <Twitter size={20} style={{cursor: "pointer"}}/>
            </ContactItem>
            <ContactItem title="YouTube">
              <Youtube size={20} style={{cursor: "pointer"}}/>
            </ContactItem>
            <ContactItem title="YouTube">
              <Instagram size={20} style={{cursor: "pointer"}}/>
            </ContactItem>
          </ContactInfo>
          <div style={{ display: "flex", gap: "15px" }}>
            <Link
              href="/dashboard"
              style={{
                color: "white",
                fontSize: "14px",
                textDecoration: "none",
              }}
            >
              Portail <strong>ADRS-GES+</strong>
            </Link>
          </div>
        </TopBarContent>
      </TopBar>

      <MainNav>
        <NavContent>
          <Logo href="/" onClick={() => setIsMenuOpen(false)}>
            <LogoImage><span className="green">A</span><span className="yellow">D</span><span className="red">RS</span></LogoImage>
            <LogoText>
              <h1>Mali</h1>
            </LogoText>
          </Logo>

          <NavLinks $isOpen={isMenuOpen}>
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                $isActive={pathname === item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            {/* <CTAButton href="/contact">Nous Contacter</CTAButton> */}
          </NavLinks>

          <ThemeToggle />

          <MobileMenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </MobileMenuButton>
        </NavContent>
      </MainNav>
    </HeaderContainer>
  )
 

}
