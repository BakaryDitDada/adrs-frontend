'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, Calendar, File, FileSpreadsheet, FilePresentation } from 'lucide-react';
import { SectionContainer, SectionContent } from '@/styles/pages/documents.styles';
import * as S from './DocumentsGrid.styles';

// Sample data
const documentsData = [
  {
    id: 1,
    title: 'Rapport Annuel 2023',
    description: 'Bilan complet des activités et réalisations de l\'ADRS pour l\'année 2023.',
    category: 'Rapports annuels',
    date: 'Jan 2024',
    type: 'PDF',
    size: '3.2 MB',
    downloads: 1245,
    url: '#'
  },
  {
    id: 2,
    title: 'Étude d\'impact des projets d\'irrigation',
    description: 'Analyse détaillée des bénéfices socio-économiques des systèmes d\'irrigation modernes.',
    category: 'Études et analyses',
    date: 'Déc 2023',
    type: 'PDF',
    size: '5.1 MB',
    downloads: 892,
    url: '#'
  },
  {
    id: 3,
    title: 'Guide pratique de l\'agriculture durable',
    description: 'Manuel de formation pour les agriculteurs sur les techniques agroécologiques.',
    category: 'Guides techniques',
    date: 'Nov 2023',
    type: 'PDF',
    size: '2.8 MB',
    downloads: 2103,
    url: '#'
  },
  {
    id: 4,
    title: 'Plan Stratégique 2024-2028',
    description: 'Vision et orientation stratégique pour les 5 prochaines années.',
    category: 'Politiques et stratégies',
    date: 'Oct 2023',
    type: 'DOC',
    size: '1.5 MB',
    downloads: 567,
    url: '#'
  },
  {
    id: 5,
    title: 'Données des projets 2023 (tableau de bord)',
    description: 'Fichier Excel contenant les indicateurs clés de performance des projets.',
    category: 'Publications',
    date: 'Sep 2023',
    type: 'XLS',
    size: '850 KB',
    downloads: 432,
    url: '#'
  },
  {
    id: 6,
    title: 'Présentation des résultats aux partenaires',
    description: 'Support de présentation utilisé lors de la réunion annuelle des partenaires.',
    category: 'Publications',
    date: 'Août 2023',
    type: 'PPT',
    size: '4.2 MB',
    downloads: 321,
    url: '#'
  },
  {
    id: 7,
    title: 'Bulletin d\'information - Trimestre 4',
    description: 'Actualités et faits marquants du dernier trimestre.',
    category: 'Communiqués',
    date: 'Déc 2023',
    type: 'PDF',
    size: '1.1 MB',
    downloads: 654,
    url: '#'
  },
  {
    id: 8,
    title: 'Rapport technique : Modernisation de l\'irrigation',
    description: 'Détails techniques et résultats du projet pilote.',
    category: 'Rapports annuels',
    date: 'Juil 2023',
    type: 'PDF',
    size: '6.3 MB',
    downloads: 789,
    url: '#'
  }
];

const getFileIcon = (type) => {
  switch(type) {
    // case 'PDF': return <FilePdf size={24} />;
    case 'DOC': return <FileText size={24} />;
    case 'XLS': return <FileSpreadsheet size={24} />;
    // case 'PPT': return <FilePresentation size={24} />;
    default: return <File size={24} />;
  }
};

export default function DocumentsGrid({
  searchQuery,
  category,
  type,
  year
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('date');

  const normalize = (value = '') =>
    value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  const filteredDocs = documentsData.filter((doc) => {
    const normalizedQuery = normalize(searchQuery);

    const matchesSearch =
      normalizedQuery === '' ||
      normalize(doc.title).includes(normalizedQuery) ||
      normalize(doc.description).includes(normalizedQuery);

    const matchesCategory =
      category === '' || doc.category === category;

    const matchesYear =
      year === '' || doc.date.split(' ')[1] === year;

    // const matchesType =
    //   type === '' || project.type === type;

    const matchesType =
      type === '' ||
      normalize(doc.type) === normalize(type);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesYear &&
      matchesType
    );
  });

  const sortedDocuments = [...filteredDocs].sort((a, b) => {
    if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    if (sortBy === 'downloads') return b.downloads - a.downloads;
    return 0;
  });

  const itemsPerPage = 6;
  const totalPages = Math.ceil(sortedDocuments.length / itemsPerPage);

  const paginatedDocs = sortedDocuments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 600, behavior: 'smooth' });
  };

  return (
    <SectionContainer>
      <SectionContent>
        <S.GridHeader>
          <S.ResultsInfo>
            <strong>{sortedDocuments.length}</strong> documents disponibles
          </S.ResultsInfo>
          <S.SortSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date">Plus récents</option>
            <option value="title">Titre (A-Z)</option>
            <option value="downloads">Plus téléchargés</option>
          </S.SortSelect>
        </S.GridHeader>

        <AnimatePresence mode="wait">
          <motion.div
            key={`page-${currentPage}-${sortBy}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <S.DocumentsGridWrapper>
              {paginatedDocs.map((doc, idx) => (
                <S.DocumentCard
                  key={doc.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <S.DocumentIcon $type={doc.type}>
                    {getFileIcon(doc.type)}
                  </S.DocumentIcon>
                  <S.DocumentContent>
                    <S.DocumentTitle>{doc.title}</S.DocumentTitle>
                    <S.DocumentMeta>
                      <span><Calendar size={14} /> {doc.date}</span>
                      <span><File size={14} /> {doc.type}, {doc.size}</span>
                      <span><Download size={14} /> {doc.downloads}</span>
                    </S.DocumentMeta>
                    <S.DocumentDescription>{doc.description}</S.DocumentDescription>
                    <S.DocumentFooter>
                      <S.DocumentCategory>{doc.category}</S.DocumentCategory>
                      <S.DownloadButton
                        href={doc.url}
                        download
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Télécharger
                        <Download size={14} />
                      </S.DownloadButton>
                    </S.DocumentFooter>
                  </S.DocumentContent>
                </S.DocumentCard>
              ))}
            </S.DocumentsGridWrapper>
          </motion.div>
        </AnimatePresence>

        {totalPages > 1 && (
          <S.Pagination>
            <S.PageButton
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ←
            </S.PageButton>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <S.PageButton
                key={page}
                $active={currentPage === page}
                onClick={() => handlePageChange(page)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {page}
              </S.PageButton>
            ))}
            <S.PageButton
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              →
            </S.PageButton>
          </S.Pagination>
        )}
      </SectionContent>
    </SectionContainer>
  );
}

// 'use client';

// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import styled from 'styled-components';
// import { FileText, Download, Calendar, File, FileSpreadsheet, FilePresentation } from 'lucide-react';
// import { SectionContainer, SectionContent } from '@/styles/pages/documents.styles';

// const GridHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 2rem;
  
//   @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
//     flex-direction: column;
//     gap: 1rem;
//     align-items: flex-start;
//   }
// `;

// const ResultsInfo = styled.div`
//   font-size: 1rem;
//   color: ${({ theme }) => theme.colors.text.secondary};
  
//   strong {
//     color: ${({ theme }) => theme.colors.text.primary};
//   }
// `;

// const SortSelect = styled.select`
//   padding: 0.5rem 2rem 0.5rem 1rem;
//   background: ${({ theme }) => theme.colors.background.secondary};
//   border: 1px solid ${({ theme }) => theme.colors.border};
//   border-radius: 8px;
//   font-size: 0.95rem;
//   color: ${({ theme }) => theme.colors.text.primary};
//   cursor: pointer;
//   appearance: none;
//   background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
//   background-repeat: no-repeat;
//   background-position: right 0.5rem center;
// `;

// const DocumentsGridWrapper = styled.div`
//   display: grid;
//   grid-template-columns: 1fr;
//   gap: 1.5rem;
  
//   @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
//     grid-template-columns: repeat(2, 1fr);
//   }
// `;

// const DocumentCard = styled(motion.div)`
//   background: ${({ theme }) => theme.colors.background.primary};
//   border: 1px solid ${({ theme }) => theme.colors.border};
//   border-radius: 16px;
//   padding: 1.5rem;
//   display: flex;
//   gap: 1rem;
//   transition: all 0.2s ease;
  
//   &:hover {
//     border-color: ${({ theme }) => theme.colors.primary};
//     box-shadow: ${({ theme }) => theme.shadows.sm};
//   }
// `;

// const DocumentIcon = styled.div`
//   width: 48px;
//   height: 48px;
//   border-radius: 12px;
//   background: ${({ theme, $type }) => {
//     if ($type === 'PDF') return '#ef444420';
//     if ($type === 'DOC') return '#3b82f620';
//     if ($type === 'XLS') return '#10b98120';
//     if ($type === 'PPT') return '#f59e0b20';
//     return theme.colors.background.secondary;
//   }};
//   color: ${({ theme, $type }) => {
//     if ($type === 'PDF') return '#ef4444';
//     if ($type === 'DOC') return '#3b82f6';
//     if ($type === 'XLS') return '#10b981';
//     if ($type === 'PPT') return '#f59e0b';
//     return theme.colors.text.secondary;
//   }};
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-shrink: 0;
// `;

// const DocumentContent = styled.div`
//   flex: 1;
// `;

// const DocumentTitle = styled.h4`
//   font-size: 1.125rem;
//   font-weight: 600;
//   color: ${({ theme }) => theme.colors.text.primary};
//   margin-bottom: 0.5rem;
//   line-height: 1.4;
// `;

// const DocumentMeta = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 1rem;
//   font-size: 0.875rem;
//   color: ${({ theme }) => theme.colors.text.secondary};
//   margin-bottom: 0.75rem;
  
//   span {
//     display: flex;
//     align-items: center;
//     gap: 0.25rem;
//   }
// `;

// const DocumentDescription = styled.p`
//   font-size: 0.875rem;
//   color: ${({ theme }) => theme.colors.text.secondary};
//   line-height: 1.5;
//   margin-bottom: 1rem;
// `;

// const DocumentFooter = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// const DocumentCategory = styled.span`
//   font-size: 0.75rem;
//   font-weight: 600;
//   color: ${({ theme }) => theme.colors.primary};
//   text-transform: uppercase;
//   letter-spacing: 0.5px;
// `;

// const DownloadButton = styled(motion.a)`
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   font-size: 0.875rem;
//   font-weight: 500;
//   color: ${({ theme }) => theme.colors.primary};
//   text-decoration: none;
//   padding: 0.25rem 0.5rem;
//   border-radius: 6px;
  
//   &:hover {
//     background: ${({ theme }) => theme.colors.primary}10;
//   }
// `;

// const Pagination = styled.div`
//   display: flex;
//   justify-content: center;
//   gap: 0.5rem;
//   margin-top: 3rem;
// `;

// const PageButton = styled(motion.button)`
//   width: 40px;
//   height: 40px;
//   border-radius: 8px;
//   border: 1px solid ${({ theme }) => theme.colors.border};
//   background: ${({ $active, theme }) => 
//     $active ? theme.colors.primary : theme.colors.background.primary};
//   color: ${({ $active, theme }) => 
//     $active ? 'white' : theme.colors.text.secondary};
//   font-size: 0.95rem;
//   font-weight: 600;
//   cursor: pointer;
  
//   &:hover:not(:disabled) {
//     border-color: ${({ theme }) => theme.colors.primary};
//     background: ${({ $active, theme }) => 
//       $active ? theme.colors.primaryDark : theme.colors.primary}10;
//   }
  
//   &:disabled {
//     opacity: 0.5;
//     cursor: not-allowed;
//   }
// `;

// // Sample data
// const documentsData = [
//   {
//     id: 1,
//     title: 'Rapport Annuel 2023',
//     description: 'Bilan complet des activités et réalisations de l\'ADRS pour l\'année 2023.',
//     category: 'Rapports annuels',
//     date: 'Jan 2024',
//     type: 'PDF',
//     size: '3.2 MB',
//     downloads: 1245,
//     url: '#'
//   },
//   {
//     id: 2,
//     title: 'Étude d\'impact des projets d\'irrigation',
//     description: 'Analyse détaillée des bénéfices socio-économiques des systèmes d\'irrigation modernes.',
//     category: 'Études et analyses',
//     date: 'Déc 2023',
//     type: 'PDF',
//     size: '5.1 MB',
//     downloads: 892,
//     url: '#'
//   },
//   {
//     id: 3,
//     title: 'Guide pratique de l\'agriculture durable',
//     description: 'Manuel de formation pour les agriculteurs sur les techniques agroécologiques.',
//     category: 'Guides techniques',
//     date: 'Nov 2023',
//     type: 'PDF',
//     size: '2.8 MB',
//     downloads: 2103,
//     url: '#'
//   },
//   {
//     id: 4,
//     title: 'Plan Stratégique 2024-2028',
//     description: 'Vision et orientation stratégique pour les 5 prochaines années.',
//     category: 'Politiques et stratégies',
//     date: 'Oct 2023',
//     type: 'DOC',
//     size: '1.5 MB',
//     downloads: 567,
//     url: '#'
//   },
//   {
//     id: 5,
//     title: 'Données des projets 2023 (tableau de bord)',
//     description: 'Fichier Excel contenant les indicateurs clés de performance des projets.',
//     category: 'Publications',
//     date: 'Sep 2023',
//     type: 'XLS',
//     size: '850 KB',
//     downloads: 432,
//     url: '#'
//   },
//   {
//     id: 6,
//     title: 'Présentation des résultats aux partenaires',
//     description: 'Support de présentation utilisé lors de la réunion annuelle des partenaires.',
//     category: 'Publications',
//     date: 'Août 2023',
//     type: 'PPT',
//     size: '4.2 MB',
//     downloads: 321,
//     url: '#'
//   },
//   {
//     id: 7,
//     title: 'Bulletin d\'information - Trimestre 4',
//     description: 'Actualités et faits marquants du dernier trimestre.',
//     category: 'Communiqués',
//     date: 'Déc 2023',
//     type: 'PDF',
//     size: '1.1 MB',
//     downloads: 654,
//     url: '#'
//   },
//   {
//     id: 8,
//     title: 'Rapport technique : Modernisation de l\'irrigation',
//     description: 'Détails techniques et résultats du projet pilote.',
//     category: 'Rapports annuels',
//     date: 'Juil 2023',
//     type: 'PDF',
//     size: '6.3 MB',
//     downloads: 789,
//     url: '#'
//   }
// ];

// const getFileIcon = (type) => {
//   switch(type) {
//     // case 'PDF': return <FilePdf size={24} />;
//     case 'DOC': return <FileText size={24} />;
//     case 'XLS': return <FileSpreadsheet size={24} />;
//     // case 'PPT': return <FilePresentation size={24} />;
//     default: return <File size={24} />;
//   }
// };

// export default function DocumentsGrid() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [sortBy, setSortBy] = useState('date');

//   const itemsPerPage = 6;
//   const totalPages = Math.ceil(documentsData.length / itemsPerPage);

//   const sortedDocuments = [...documentsData].sort((a, b) => {
//     if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
//     if (sortBy === 'title') return a.title.localeCompare(b.title);
//     if (sortBy === 'downloads') return b.downloads - a.downloads;
//     return 0;
//   });

//   const paginatedDocs = sortedDocuments.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     window.scrollTo({ top: 600, behavior: 'smooth' });
//   };

//   return (
//     <SectionContainer>
//       <SectionContent>
//         <GridHeader>
//           <ResultsInfo>
//             <strong>{documentsData.length}</strong> documents disponibles
//           </ResultsInfo>
//           <SortSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
//             <option value="date">Plus récents</option>
//             <option value="title">Titre (A-Z)</option>
//             <option value="downloads">Plus téléchargés</option>
//           </SortSelect>
//         </GridHeader>

//         <AnimatePresence mode="wait">
//           <motion.div
//             key={`page-${currentPage}-${sortBy}`}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.3 }}
//           >
//             <DocumentsGridWrapper>
//               {paginatedDocs.map((doc, idx) => (
//                 <DocumentCard
//                   key={doc.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: idx * 0.05 }}
//                 >
//                   <DocumentIcon $type={doc.type}>
//                     {getFileIcon(doc.type)}
//                   </DocumentIcon>
//                   <DocumentContent>
//                     <DocumentTitle>{doc.title}</DocumentTitle>
//                     <DocumentMeta>
//                       <span><Calendar size={14} /> {doc.date}</span>
//                       <span><File size={14} /> {doc.type}, {doc.size}</span>
//                       <span><Download size={14} /> {doc.downloads}</span>
//                     </DocumentMeta>
//                     <DocumentDescription>{doc.description}</DocumentDescription>
//                     <DocumentFooter>
//                       <DocumentCategory>{doc.category}</DocumentCategory>
//                       <DownloadButton
//                         href={doc.url}
//                         download
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                       >
//                         Télécharger
//                         <Download size={14} />
//                       </DownloadButton>
//                     </DocumentFooter>
//                   </DocumentContent>
//                 </DocumentCard>
//               ))}
//             </DocumentsGridWrapper>
//           </motion.div>
//         </AnimatePresence>

//         {totalPages > 1 && (
//           <Pagination>
//             <PageButton
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               ←
//             </PageButton>
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
//               <PageButton
//                 key={page}
//                 $active={currentPage === page}
//                 onClick={() => handlePageChange(page)}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 {page}
//               </PageButton>
//             ))}
//             <PageButton
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               →
//             </PageButton>
//           </Pagination>
//         )}
//       </SectionContent>
//     </SectionContainer>
//   );
// }