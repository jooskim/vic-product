// Copyright 2016-2017 VMware, Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package tags

import (
	"encoding/json"
	"fmt"
	"net/http"

	log "github.com/sirupsen/logrus"

	"github.com/vmware/vic/pkg/errors"
)

const (
	TagAssociationURL = "/com/vmware/cis/tagging/tag-association"
)

type AssociatedObject struct {
	Id   *string `json:"id"`
	Type *string `json:"type"`
}

type TagAssociationSpec struct {
	ObjectId *AssociatedObject `json:"object_id,omitempty"`
	TagId    *string           `json:"tag_id,omitempty"`
}

func (c *RestClient) getAssociatedObject(objId *string, objType *string) *AssociatedObject {
	if objId == nil && objType == nil {
		return nil
	}
	object := AssociatedObject{
		Id:   objId,
		Type: objType,
	}
	return &object
}

func (c *RestClient) getAssociationSpec(tagId *string, objId *string, objType *string) *TagAssociationSpec {
	object := c.getAssociatedObject(objId, objType)
	spec := TagAssociationSpec{
		TagId:    tagId,
		ObjectId: object,
	}
	return &spec
}

// AttachTagToObject assigns the tag to the given object.
// If the object already has the tag, it's a no op and no error is thrown.
// If any parameter is invalid or the associable type of the tag doesn't match object type, an error is thrown.
func (c *RestClient) AttachTagToObject(tagId string, objId string, objType string) error {
	log.Debugf("Attach Tag %s to object id: %s, type: %s", tagId, objId, objType)

	spec := c.getAssociationSpec(&tagId, &objId, &objType)
	_, _, status, err := c.call(http.MethodPost, fmt.Sprintf("%s?~action=attach", TagAssociationURL), *spec, nil)

	log.Debugf("Get status code: %d", status)
	if status != http.StatusOK || err != nil {
		log.Debugf("Attach tag failed with status code: %d, error message: %s", status, errors.ErrorStack(err))
		return errors.Errorf("Get unexpected status code: %d", status)
	}
	return nil
}

// DetachTagFromObject detaches the tag to the given object.
// If object doesn't have the tag, it's a no op and no error is thrown.
// If any parameter is invalid or the tag doesn't match object type, an error is thrown.
func (c *RestClient) DetachTagFromObject(tagId string, objId string, objType string) error {
	log.Debugf("Detach Tag %s to object id: %s, type: %s", tagId, objId, objType)

	spec := c.getAssociationSpec(&tagId, &objId, &objType)
	_, _, status, err := c.call(http.MethodPost, fmt.Sprintf("%s?~action=detach", TagAssociationURL), *spec, nil)

	log.Debugf("Get status code: %d", status)
	if status != http.StatusOK || err != nil {
		log.Debugf("Detach tag failed with status code: %d, error message: %s", status, errors.ErrorStack(err))
		return errors.Errorf("Get unexpected status code: %d", status)
	}
	return nil
}

// ListAttachedTags lists all tags that have been attached to the given object.
func (c *RestClient) ListAttachedTags(objId string, objType string) ([]string, error) {
	log.Debugf("List attached tags of object id: %s, type: %s", objId, objType)

	spec := c.getAssociationSpec(nil, &objId, &objType)
	stream, _, status, err := c.call(http.MethodPost, fmt.Sprintf("%s?~action=list-attached-tags", TagAssociationURL), *spec, nil)

	log.Debugf("Get status code: %d", status)
	if status != http.StatusOK || err != nil {
		log.Debugf("Detach tag failed with status code: %d, error message: %s", status, errors.ErrorStack(err))
		return nil, errors.Errorf("Get unexpected status code: %d", status)
	}

	type RespValue struct {
		Value []string
	}

	var pTag RespValue
	if err := json.NewDecoder(stream).Decode(&pTag); err != nil {
		log.Debugf("Decode response body failed for: %s", errors.ErrorStack(err))
		return nil, errors.Trace(err)
	}
	return pTag.Value, nil
}

// ListAttachedObjects lists all objects that have been tagged with the given tag.
func (c *RestClient) ListAttachedObjects(tagId string) ([]AssociatedObject, error) {
	log.Debugf("List attached objects of tag: %s", tagId)

	spec := c.getAssociationSpec(&tagId, nil, nil)
	log.Debugf("List attached objects for tag %v", *spec)

	stream, _, status, err := c.call(http.MethodPost, fmt.Sprintf("%s?~action=list-attached-objects", TagAssociationURL), *spec, nil)
	log.Debugf("Get status code: %d", status)
	if status != http.StatusOK || err != nil {
		log.Debugf("List object failed with status code: %d, error message: %s", status, errors.ErrorStack(err))
		return nil, errors.Errorf("Get unexpected status code: %d", status)
	}

	type RespValue struct {
		Value []AssociatedObject
	}

	var pTag RespValue
	if err := json.NewDecoder(stream).Decode(&pTag); err != nil {
		log.Debugf("Decode response body failed for: %s", errors.ErrorStack(err))
		return nil, errors.Trace(err)
	}
	return pTag.Value, nil
}
