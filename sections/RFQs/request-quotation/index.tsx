"use client";

import { Input, Button, Row, Col } from "antd";
import { MailOutlined, SearchOutlined } from "@ant-design/icons";
import GoBack from "@/components/common/go-back";
import RFQForm from "./RFQForm";
import { GRF_OPTS } from "./data";
import { useRequestQuotation } from "./use-request-quotation";
import VendorTable from "../vendor-table";

export default function RequestQuotationSection() {
  const vm = useRequestQuotation();

  return (
    <>
      <div className="mx-auto max-w-7xl">
        <Row gutter={[0, 24]}>
          <Col>
            <GoBack link="/dashboard/RFQs" />
          </Col>

          <Col span={24}>
            <h1 className="text-xl font-semibold pb-2 border-b border-gray-200">
              Request for Quotation
            </h1>
          </Col>
          {/* ───────── Toolbar ───────── */}
          <Col span={24}>
            <div className="flex justify-end">
              <Button
                type="primary"
                icon={<MailOutlined />}
                disabled={!vm.canEmail}
                onClick={vm.showModal}
              >
                Send&nbsp;Request&nbsp;to&nbsp;Selected&nbsp;Vendors
              </Button>
            </div>
          </Col>

          {/* ───────── Search ───────── */}
          <Col>
            <Input
              allowClear
              prefix={<SearchOutlined />}
              placeholder="Search vendor / contact info"
              value={vm.vendor.search}
              onChange={(e) => vm.vendor.setSearch(e.target.value)}
              className="w-56"
            />
          </Col>

          {/* ───────── Vendor List ───────── */}
          <Col span={24}>
            <VendorTable
              data={vm.vendor.data}
              columns={vm.vendor.columns}
              rowSelection={vm.vendor.rowSelection}
            />
          </Col>
        </Row>
      </div>
      {/* ───────── Send-GRF Modal ───────── */}
      <RFQForm
        open={vm.modalOpen}
        onCancel={vm.hideModal}
        vendors={vm.selectedVendors} // each item has id, name, email
        grfOptions={GRF_OPTS}
      />
    </>
  );
}
