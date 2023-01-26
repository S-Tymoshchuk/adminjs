import React from 'react';
import {
  Box,
  FormGroup,
  Label,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@adminjs/design-system';
import { flat, useTranslation, BasePropertyProps } from 'adminjs';

const PostsList = (props: BasePropertyProps) => {
  const { translateLabel } = useTranslation();
  const params = flat.unflatten(props.record.params);
  return (
    <FormGroup mb={24}>
      <Label>Post list</Label>
      <Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{translateLabel('ID')}</TableCell>
              <TableCell>{translateLabel('Title')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!params.posts.length && (
              <TableRow>
                <TableCell colSpan={5} style={{ textAlign: 'center' }}>
                  No records
                </TableCell>
              </TableRow>
            )}
            {params.posts.length > 0 &&
              params.posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>{post.id}</TableCell>
                  <TableCell>{post.title}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>
    </FormGroup>
  );
};

export default PostsList;
