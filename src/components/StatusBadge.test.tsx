import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { StatusBadge } from './StatusBadge';

describe('StatusBadge', () => {
  it('renders active status', () => {
    const { container } = render(<StatusBadge status="active" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders expired status', () => {
    const { container } = render(<StatusBadge status="expired" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders revoked status', () => {
    const { container } = render(<StatusBadge status="revoked" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
