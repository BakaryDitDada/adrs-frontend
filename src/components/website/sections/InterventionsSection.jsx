import React from "react";
import { motion } from "framer-motion";
import {
  Section,
  SectionTitle,
  SectionContent,
} from "./Sections.styles.js";
import { homeContent } from "@/data/homeContent.js";

const InterventionsSection = () => {
  return (
    <Section>
      <SectionContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle>
            Nos <span>Domaines</span> d&apos;Intervention
          </SectionTitle>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(1, 1fr)",
              gap: "30px",
              maxWidth: "1000px",
              margin: "0 auto",
            }}
          >
            {homeContent.interventions.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{
                  background: "var(--background-primary)",
                  borderRadius: "12px",
                  padding: "30px",
                  boxShadow: "var(--shadow-md)",
                  border: "1px solid var(--border-color)",
                  transition: "transform 0.2s ease",
                  cursor: "pointer",
                }}
                whileHover={{ y: -5 }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    marginBottom: "15px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "2rem",
                      width: "60px",
                      height: "60px",
                      background: "var(--primary-color)10",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </div>
                  <h3
                    style={{
                      color: "var(--text-primary)",
                      fontSize: "2rem",
                      margin: "0",
                    }}
                  >
                    {item.title}
                  </h3>
                </div>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    lineHeight: "1.6",
                    margin: "0",
                  }}
                >
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </SectionContent>
    </Section>
  );
};

export default InterventionsSection;
