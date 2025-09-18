'use client'

import { useState } from 'react';

interface Certificate {
  id: number;
  title: string;
  issuingOrganization: string;
  issueDate: string;
  expiryDate?: string;
  status: 'verified' | 'pending' | 'rejected';
  fileUrl?: string;
}

export default function ArtisanCertificates() {
  const [certificates] = useState<Certificate[]>([
    {
      id: 1,
      title: 'Advanced Pottery Certification',
      issuingOrganization: 'National Artisans Association',
      issueDate: '2022-06-15',
      expiryDate: '2024-06-15',
      status: 'verified',
      fileUrl: '/certificates/pottery.pdf'
    },
    {
      id: 2,
      title: 'Food Safety Handling',
      issuingOrganization: 'Health Department',
      issueDate: '2023-01-20',
      status: 'pending'
    }
  ]);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Handle file upload logic here
    console.log('File uploaded:', event.target.files?.[0]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Certificates</h1>
        <label className="btn-primary cursor-pointer">
          Upload Certificate
          <input
            type="file"
            className="hidden"
            onChange={handleUpload}
            accept=".pdf,.jpg,.jpeg,.png"
          />
        </label>
      </div>

      {certificates.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-600 mb-4">You haven't uploaded any certificates yet.</p>
          <p className="text-sm text-gray-500 mb-4">
            Certificates help build trust with customers and can increase your sales.
          </p>
          <label className="btn-primary cursor-pointer">
            Upload Your First Certificate
            <input
              type="file"
              className="hidden"
              onChange={handleUpload}
              accept=".pdf,.jpg,.jpeg,.png"
            />
          </label>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {certificates.map((certificate) => (
            <div key={certificate.id} className="card">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{certificate.title}</h3>
                  <p className="text-gray-600 mb-2">
                    Issued by: {certificate.issuingOrganization}
                  </p>
                  <p className="text-gray-600 mb-2">
                    Issue Date: {new Date(certificate.issueDate).toLocaleDateString()}
                  </p>
                  {certificate.expiryDate && (
                    <p className="text-gray-600 mb-2">
                      Expiry Date: {new Date(certificate.expiryDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  certificate.status === 'verified' ? 'bg-green-100 text-green-800' :
                  certificate.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {certificate.status.charAt(0).toUpperCase() + certificate.status.slice(1)}
                </span>
              </div>
              
              {certificate.fileUrl && (
                <div className="mt-4">
                  <a
                    href={certificate.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Certificate
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="card mt-8">
        <h2 className="text-xl font-semibold mb-4">Why Certificates Matter</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>Build trust with potential customers</li>
          <li>Showcase your expertise and qualifications</li>
          <li>Increase your products' perceived value</li>
          <li>Meet marketplace requirements for certain product categories</li>
        </ul>
      </div>
    </div>
  );
}