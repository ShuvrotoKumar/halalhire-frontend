'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RegistrationContextType {
    photo: File | null;
    nationalId: File | null;
    internationalPassport: File | null;
    document: File | null; // Resume
    professionalCertificates: File[];
    setPhoto: (file: File | null) => void;
    setNationalId: (file: File | null) => void;
    setInternationalPassport: (file: File | null) => void;
    setDocument: (file: File | null) => void;
    addCertificate: (file: File) => void;
    removeCertificate: (index: number) => void;
    clearFiles: () => void;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export const RegistrationProvider = ({ children }: { children: ReactNode }) => {
    const [photo, setPhoto] = useState<File | null>(null);
    const [nationalId, setNationalId] = useState<File | null>(null);
    const [internationalPassport, setInternationalPassport] = useState<File | null>(null);
    const [document, setDocument] = useState<File | null>(null);
    const [professionalCertificates, setProfessionalCertificates] = useState<File[]>([]);

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
    };

    return (
        <RegistrationContext.Provider value={{
            photo,
            nationalId,
            internationalPassport,
            document,
            professionalCertificates,
            setPhoto,
            setNationalId,
            setInternationalPassport,
            setDocument,
            addCertificate,
            removeCertificate,
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
