'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RegistrationContextType {
    photo: File | null;
    nationalId: File | null;
    internationalPassport: File | null;
    document: File | null; // Resume
    professionalCertificates: File[];
    // Company specific files
    companyLogo: File | null;
    bannerImage: File | null;
    businessRegistrationCertificate: File | null;
    halalCertification: File | null;
    
    setPhoto: (file: File | null) => void;
    setNationalId: (file: File | null) => void;
    setInternationalPassport: (file: File | null) => void;
    setDocument: (file: File | null) => void;
    addCertificate: (file: File) => void;
    removeCertificate: (index: number) => void;
    
    setCompanyLogo: (file: File | null) => void;
    setBannerImage: (file: File | null) => void;
    setBusinessRegistrationCertificate: (file: File | null) => void;
    setHalalCertification: (file: File | null) => void;
    
    clearFiles: () => void;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export const RegistrationProvider = ({ children }: { children: ReactNode }) => {
    const [photo, setPhoto] = useState<File | null>(null);
    const [nationalId, setNationalId] = useState<File | null>(null);
    const [internationalPassport, setInternationalPassport] = useState<File | null>(null);
    const [document, setDocument] = useState<File | null>(null);
    const [professionalCertificates, setProfessionalCertificates] = useState<File[]>([]);
    
    // Company specific files
    const [companyLogo, setCompanyLogo] = useState<File | null>(null);
    const [bannerImage, setBannerImage] = useState<File | null>(null);
    const [businessRegistrationCertificate, setBusinessRegistrationCertificate] = useState<File | null>(null);
    const [halalCertification, setHalalCertification] = useState<File | null>(null);

    const addCertificate = (file: File) => {
        setProfessionalCertificates(prev => [...prev, file]);
    };

    const removeCertificate = (index: number) => {
        setProfessionalCertificates(prev => prev.filter((_, i) => i !== index));
    };

    const clearFiles = () => {
        setPhoto(null);
        setNationalId(null);
        setInternationalPassport(null);
        setDocument(null);
        setProfessionalCertificates([]);
        setCompanyLogo(null);
        setBannerImage(null);
        setBusinessRegistrationCertificate(null);
        setHalalCertification(null);
    };

    return (
        <RegistrationContext.Provider value={{
            photo,
            nationalId,
            internationalPassport,
            document,
            professionalCertificates,
            companyLogo,
            bannerImage,
            businessRegistrationCertificate,
            halalCertification,
            setPhoto,
            setNationalId,
            setInternationalPassport,
            setDocument,
            addCertificate,
            removeCertificate,
            setCompanyLogo,
            setBannerImage,
            setBusinessRegistrationCertificate,
            setHalalCertification,
            clearFiles
        }}>
            {children}
        </RegistrationContext.Provider>
    );
};

export const useRegistrationFiles = () => {
    const context = useContext(RegistrationContext);
    if (context === undefined) {
        throw new Error('useRegistrationFiles must be used within a RegistrationProvider');
    }
    return context;
};
