'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
  isApplyModalOpen: boolean;
  isProfileEditModalOpen: boolean;
  activeJob: any | null;
  openApplyModal: (job: any) => void;
  closeApplyModal: () => void;
  openProfileEditModal: () => void;
  closeProfileEditModal: () => void;
  isJobEditModalOpen: boolean;
  openJobEditModal: (job?: any) => void;
  closeJobEditModal: () => void;
  isJobDeleteModalOpen: boolean;
  openJobDeleteModal: (job: any) => void;
  closeJobDeleteModal: () => void;
  isTeamMemberModalOpen: boolean;
  openTeamMemberModal: (member?: any) => void;
  closeTeamMemberModal: () => void;
  isAcceptModalOpen: boolean;
  openAcceptModal: (applicant: any) => void;
  closeAcceptModal: () => void;
  isRejectModalOpen: boolean;
  openRejectModal: (applicant: any) => void;
  closeRejectModal: () => void;
  activeMember: any | null;
  activeApplicant: any | null;
  isContactConfirmModalOpen: boolean;
  openContactConfirmModal: () => void;
  closeContactConfirmModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isProfileEditModalOpen, setIsProfileEditModalOpen] = useState(false);
  const [activeJob, setActiveJob] = useState<any>(null);
  const [isJobEditModalOpen, setIsJobEditModalOpen] = useState(false);
  const [isJobDeleteModalOpen, setIsJobDeleteModalOpen] = useState(false);
  const [isTeamMemberModalOpen, setIsTeamMemberModalOpen] = useState(false);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [activeMember, setActiveMember] = useState<any>(null);
  const [activeApplicant, setActiveApplicant] = useState<any>(null);
  const [isContactConfirmModalOpen, setIsContactConfirmModalOpen] = useState(false);

  const openApplyModal = (job: any) => {
    setActiveJob(job);
    setIsApplyModalOpen(true);
  };

  const closeApplyModal = () => {
    setIsApplyModalOpen(false);
    setActiveJob(null);
  };

  const openProfileEditModal = () => setIsProfileEditModalOpen(true);
  const closeProfileEditModal = () => setIsProfileEditModalOpen(false);

  const openJobEditModal = (job?: any) => {
    setActiveJob(job || null);
    setIsJobEditModalOpen(true);
  };
  const closeJobEditModal = () => {
    setIsJobEditModalOpen(false);
    setActiveJob(null);
  };

  const openJobDeleteModal = (job: any) => {
    setActiveJob(job);
    setIsJobDeleteModalOpen(true);
  };
  const closeJobDeleteModal = () => {
    setIsJobDeleteModalOpen(false);
    setActiveJob(null);
  };

  const openTeamMemberModal = (member?: any) => {
    setActiveMember(member || null);
    setIsTeamMemberModalOpen(true);
  };
  const closeTeamMemberModal = () => {
    setIsTeamMemberModalOpen(false);
    setActiveMember(null);
  };

  const openAcceptModal = (applicant: any) => {
    setActiveApplicant(applicant);
    setIsAcceptModalOpen(true);
  };
  const closeAcceptModal = () => {
    setIsAcceptModalOpen(false);
    setActiveApplicant(null);
  };

  const openRejectModal = (applicant: any) => {
    setActiveApplicant(applicant);
    setIsRejectModalOpen(true);
  };
  const closeRejectModal = () => {
    setIsRejectModalOpen(false);
    setActiveApplicant(null);
  };

  const openContactConfirmModal = () => setIsContactConfirmModalOpen(true);
  const closeContactConfirmModal = () => setIsContactConfirmModalOpen(false);

  return (
    <ModalContext.Provider value={{ 
      isApplyModalOpen, 
      isProfileEditModalOpen,
      activeJob, 
      openApplyModal, 
      closeApplyModal,
      openProfileEditModal,
      closeProfileEditModal,
      isJobEditModalOpen,
      openJobEditModal,
      closeJobEditModal,
      isJobDeleteModalOpen,
      openJobDeleteModal,
      closeJobDeleteModal,
      isTeamMemberModalOpen,
      openTeamMemberModal,
      closeTeamMemberModal,
      isAcceptModalOpen,
      openAcceptModal,
      closeAcceptModal,
      isRejectModalOpen,
      openRejectModal,
      closeRejectModal,
      activeMember,
      activeApplicant,
      isContactConfirmModalOpen,
      openContactConfirmModal,
      closeContactConfirmModal
    }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
