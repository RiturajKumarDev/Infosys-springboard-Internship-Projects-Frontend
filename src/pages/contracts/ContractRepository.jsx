import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, Eye, Archive } from 'lucide-react';
import FormInput from '../../components/Form/FormInput';
import FormSelect from '../../components/Form/FormSelect';
import Dropdown from '../../components/Buttons/Dropdown';
import Button from '../../components/Buttons/Button';
import Modal from '../../components/Modals/Modal';
import Badge from '../../components/DataDisplay/Badge';
import Table from '../../components/DataDisplay/Table';
import './Contracts.css';

const ContractRepository = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const [contracts, setContracts] = useState([
    { id: 'CON-2023-001', name: 'Vendor Agreement - TechCorp', category: 'Vendor Contract', status: 'Active', value: '$120,000', expiry: '2025-12-31' },
    { id: 'CON-2023-045', name: 'Office Lease - Downtown', category: 'Lease Agreement', status: 'Under Review', value: '$50,000/yr', expiry: '2026-06-30' },
    { id: 'CON-2023-089', name: 'Software License - Adobe', category: 'Service Agreement', status: 'Approved', value: '$12,000', expiry: '2024-10-15' },
    { id: 'CON-2023-112', name: 'Employment - Jane Doe', category: 'Employment Contract', status: 'Draft', value: '-', expiry: '-' },
    { id: 'CON-2022-404', name: 'Partnership - GlobalTech', category: 'Partnership Agreement', status: 'Expired', value: '$250,000', expiry: '2023-01-01' },
  ]);

  const [newContract, setNewContract] = useState({ name: '', companyName: '', vendorName: '', category: 'Vendor Contract', value: '', expiry: '' });

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Active': return <Badge variant="success">{status}</Badge>;
      case 'Under Review': return <Badge variant="warning">{status}</Badge>;
      case 'Draft': return <Badge variant="primary">{status}</Badge>;
      case 'Approved': return <Badge variant="primary">{status}</Badge>;
      case 'Expired': return <Badge variant="danger">{status}</Badge>;
      case 'Archived': return <Badge variant="default">{status}</Badge>;
      default: return <Badge variant="default">{status}</Badge>;
    }
  };

  const handleRowClick = (id) => {
    navigate(`/contracts/${id}`);
  };

  const handleUploadContract = (e) => {
    e.preventDefault();
    const id = `CON-2023-${Math.floor(Math.random() * 900) + 100}`;
    setContracts([{ id, ...newContract, status: 'Draft' }, ...contracts]);
    setIsUploadModalOpen(false);
    setNewContract({ name: '', companyName: '', vendorName: '', category: 'Vendor Contract', value: '', expiry: '' });
  };

  const handleArchive = (e, id) => {
    e.stopPropagation();
    setContracts(contracts.map(c => c.id === id ? { ...c, status: 'Archived' } : c));
  };

  const filteredContracts = contracts.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory ? c.category.includes(filterCategory) : true;
    const matchesStatus = filterStatus ? c.status === filterStatus : true;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="contracts-container">
      <div className="contracts-header">
        <div>
          <h1>Contract Repository</h1>
          <p className="text-muted">Manage, search, and view all your organization's contracts.</p>
        </div>
        <Button variant="primary" onClick={() => setIsUploadModalOpen(true)} icon={Plus}>
          Upload Contract
        </Button>
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
                { value: 'Vendor Contract', label: 'All Categories' },
                { value: 'Employment Contract', label: 'Employment' },
                { value: 'Lease Agreement', label: 'Lease Agreements' },
                { value: 'Service Agreement', label: 'Service Agreement' }
              ]}
              style={{ width: '180px', margin: 0, backgroundColor: 'var(--color-bg-light)', border: 'none' }}
            />
            <FormSelect 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              options={[
                { value: 'Active', label: 'All Statuses' },
                { value: 'Draft', label: 'Draft' },
                { value: 'Under Review', label: 'Under Review' },
                { value: 'Archived', label: 'Archived' }
              ]}
              style={{ width: '160px', margin: 0, backgroundColor: 'var(--color-bg-light)', border: 'none' }}
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
                      {contract.status !== 'Archived' && (
                        <Button variant="icon" title="Archive Contract" onClick={(e) => handleArchive(e, contract.id)} icon={Archive} />
                      )}
                      <Dropdown 
                        label="" 
                        items={[
                          { label: 'Edit' },
                          { label: 'Download' }
                        ]}
                        onSelect={(item) => console.log(item.label, contract.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
        </Table>
      </div>

      {/* Upload Contract Modal */}
      <Modal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)}
        title="Upload New Contract"
        footer={
          <>
            <Button type="button" variant="outline" onClick={() => setIsUploadModalOpen(false)}>Cancel</Button>
            <Button type="button" variant="primary" onClick={handleUploadContract}>Upload & Create Draft</Button>
          </>
        }
      >
        <form onSubmit={handleUploadContract} id="upload-contract-form">
          <FormInput 
            label="Contract Name"
            type="text" 
            placeholder="e.g. Acme Corp NDA" 
            required 
            value={newContract.name}
            onChange={(e) => setNewContract({...newContract, name: e.target.value})}
          />
          <FormInput 
            label="Company Name"
            type="text" 
            placeholder="e.g. Global Industries Ltd." 
            required 
            value={newContract.companyName}
            onChange={(e) => setNewContract({...newContract, companyName: e.target.value})}
          />
          <FormInput 
            label="Vendor Name"
            type="text" 
            placeholder="e.g. TechCorp Solutions Inc." 
            required 
            value={newContract.vendorName}
            onChange={(e) => setNewContract({...newContract, vendorName: e.target.value})}
          />
          <FormSelect 
            label="Category"
            value={newContract.category}
            onChange={(e) => setNewContract({...newContract, category: e.target.value})}
            options={[
              { value: 'Vendor Contract', label: 'Vendor Contract' },
              { value: 'Employment Contract', label: 'Employment Contract' },
              { value: 'Lease Agreement', label: 'Lease Agreement' },
              { value: 'Service Agreement', label: 'Service Agreement' }
            ]}
          />
          <div className="flex gap-4">
            <FormInput 
              label="Value"
              type="text" 
              placeholder="$0.00" 
              value={newContract.value}
              onChange={(e) => setNewContract({...newContract, value: e.target.value})}
            />
            <FormInput 
              label="Expiry Date"
              type="date" 
              required 
              value={newContract.expiry}
              onChange={(e) => setNewContract({...newContract, expiry: e.target.value})}
            />
          </div>
          <FormInput 
            label="Attach File"
            type="file" 
            required 
          />
        </form>
      </Modal>
    </div>
  );
};

export default ContractRepository;
