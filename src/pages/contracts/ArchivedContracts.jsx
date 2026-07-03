import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Eye, RotateCcw } from 'lucide-react';
import FormInput from '../../components/Form/FormInput';
import FormSelect from '../../components/Form/FormSelect';
import Dropdown from '../../components/Buttons/Dropdown';
import Button from '../../components/Buttons/Button';
import Modal from '../../components/Modals/Modal';
import Badge from '../../components/DataDisplay/Badge';
import Table from '../../components/DataDisplay/Table';
import './Contracts.css';

const ArchivedContracts = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [restoreModalOpen, setRestoreModalOpen] = useState(false);
  const [contractToRestore, setContractToRestore] = useState(null);

  const [contracts, setContracts] = useState([
    { id: 'CON-2021-004', name: 'Service Agreement - Alpha Co', category: 'Service Agreement', status: 'Archived', value: '$80,000', expiry: '2022-05-31' },
    { id: 'CON-2020-092', name: 'Vendor Contract - Beta Ltd', category: 'Vendor Contract', status: 'Archived', value: '$45,000', expiry: '2021-12-15' },
    { id: 'CON-2019-115', name: 'Lease Agreement - Old HQ', category: 'Lease Agreement', status: 'Archived', value: '$120,000/yr', expiry: '2020-10-31' },
  ]);

  const getStatusBadge = (status) => {
    return <Badge variant={status === 'Archived' ? 'default' : 'primary'}>{status}</Badge>;
  };

  const handleRowClick = (id) => {
    navigate(`/contracts/${id}`);
  };

  const handleRestoreClick = (e, id) => {
    e.stopPropagation();
    setContractToRestore(id);
    setRestoreModalOpen(true);
  };

  const confirmRestore = () => {
    setContracts(contracts.filter(c => c.id !== contractToRestore));
    setRestoreModalOpen(false);
    setContractToRestore(null);
  };

  const filteredContracts = contracts.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory ? c.category.includes(filterCategory) : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="contracts-container">
      <div className="contracts-header">
        <div>
          <h1>Archived Contracts</h1>
          <p className="text-muted">View and manage contracts that have been archived.</p>
        </div>
      </div>

      <div className="main-card animate-slide-up">
        <div className="controls-bar" style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0' }}>
          <div className="input-with-icon" style={{ flex: 1 }}>
            <Search size={18} className="input-icon" />
            <FormInput 
              type="text" 
              placeholder="Search by ID, name, or counterparty..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', paddingLeft: '2.5rem', margin: 0, backgroundColor: 'var(--color-bg-light)', border: 'none' }}
            />
          </div>
          
          <div className="filters" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <FormSelect 
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)}
              options={[
                { value: 'Vendor', label: 'All Categories' },
                { value: 'Employment', label: 'Employment' },
                { value: 'Lease', label: 'Lease Agreements' },
                { value: 'Service', label: 'Service Agreement' }
              ]}
              style={{ width: '200px', margin: 0, backgroundColor: 'var(--color-bg-light)', border: 'none' }}
            />
          </div>
        </div>

        <Table>
            <thead>
              <tr>
                <th>Contract ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Status</th>
                <th>Value</th>
                <th>Expiry Date</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContracts.map((contract) => (
                <tr key={contract.id} style={{ cursor: 'pointer' }} onClick={() => handleRowClick(contract.id)}>
                  <td className="font-semibold" style={{ color: 'var(--color-text-dark)' }}>{contract.id}</td>
                  <td className="font-semibold">{contract.name}</td>
                  <td style={{ color: 'var(--color-text-light)' }}>{contract.category}</td>
                  <td>{getStatusBadge(contract.status)}</td>
                  <td>{contract.value}</td>
                  <td>{contract.expiry}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <div className="flex gap-2 items-center justify-center">
                      <Button variant="icon" title="View Details" onClick={() => handleRowClick(contract.id)} icon={Eye} />
                      <Button variant="icon" title="Restore Contract" onClick={(e) => handleRestoreClick(e, contract.id)} icon={RotateCcw} />
                      <Dropdown 
                        label="" 
                        items={[
                          { label: 'Export PDF' },
                          { label: 'View History' }
                        ]}
                        onSelect={(item) => console.log(item.label, contract.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
              {filteredContracts.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center text-muted" style={{ padding: '2rem' }}>No archived contracts found.</td>
                </tr>
              )}
            </tbody>
        </Table>
      </div>

      <Modal 
        isOpen={restoreModalOpen} 
        onClose={() => setRestoreModalOpen(false)}
        title="Confirm Restore"
        footer={
          <>
            <Button variant="outline" onClick={() => setRestoreModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={confirmRestore}>Restore</Button>
          </>
        }
      >
        <p>Are you sure you want to restore contract <strong>{contractToRestore}</strong>?</p>
        <p className="text-muted mt-2">This will move it back to the active contract repository.</p>
      </Modal>
    </div>
  );
};

export default ArchivedContracts;
