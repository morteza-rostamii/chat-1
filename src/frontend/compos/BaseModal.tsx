"use client"

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react'
import { useBaseModal } from '../providers/BaseModalProvider'
import React from 'react';

export function BaseModal() {
  const {
    isOpen, 
    //onOpen, 
    onClose,
    child,
    data,
  } = useBaseModal();

  return (
    <>
      <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      isCentered={true}
      scrollBehavior='inside'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className='border-b-2'>
            {data?.title || 'Modal Title'}
          </ModalHeader>
          <ModalCloseButton className='mt-2'/>
          <ModalBody>
          {child}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}